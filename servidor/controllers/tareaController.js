const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//Crea una tarea en el proyecto actual
exports.crearTarea = async (req, res) => {

    //Revisamos si hay errores
    const errores = validationResult(req);
    //Si existen errores manda el status de fallo y el o los errores
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }


    try {
        
        //Extraemos el proyecto y comprobamos si existe
        const { proyecto } = req.body;

        //Validamos que el proyecto existas
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado.
        if(existeProyecto.autor.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //Creamos la tarea y la guardamos
        const tarea = new Tarea(req.body);//Contiene el nombre del proyecto y la tarea.
        await tarea.save();

        //Mandamos el json de respuesta con la tarea creada
        res.json({ tarea });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor.');
    }
    
}

//Obtiene todas las tareas del proyecto actual
exports.obtenerTareas = async (req, res) => {
    try {

        //Extraemos el proyecto y comprobamos si existe
        const { proyecto } = req.body;

        //Validamos que el proyecto existas
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado.
        if(existeProyecto.autor.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //Obtenemos las tareas por proyecto
        //Tarea.find where proyecto del modelo es igual al proyecto que que extraímos 
        const tareas = await Tarea.find({ proyecto: proyecto }).sort({ creado: -1});
        
        //Mandamos el json de respuesta
        res.json({ tareas });
        
    } catch (error) {
        res.status(500).send('Hubo un error.');
    }
}

//Actualiza una tarea seleccionada del proyecto actual
exports.actualizarTarea = async (req, res) => {

    try {

        //Extraemos el proyecto y comprobamos si existe y tambien necesitamos el 
        //nombre de la tarea y el estado de la tarea
        const { proyecto, nombre, estado } = req.body;

        //Validamos que el proyecto existas
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //Revisamos si la tarea existe, params obtiene al id que se le pasa desde la url
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) {
            return res.status(404).json({msg: 'Tarea no encontrada.'})
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado.
        if(existeProyecto.autor.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
    
        
        //Crear un nuevo objeto con la nueva informacion
        const tareaActualizada = {};//Aqui se almacenará el proyecto actualizado

        //Añadimos más if si queremos validar más datos
        if(nombre) {
            tareaActualizada.nombre = nombre; //Asignamos el dato al nuevo array
        }
        if(estado) {
            tareaActualizada.estado = estado; //Asignamos el dato al nuevo array
        }
        
        //Actualizar
        //Consulta mongo: buscar y actualizar where id = req.params.id, con que lo actualizaremos, indicamos que es true
        tarea = await Tarea.findByIdAndUpdate( {_id: req.params.id }, {$set: tareaActualizada },{new: true} )

        //Retornamos el json de respuesta
        res.json({ tarea });


    } catch (error) {
        res.status(500).send('Hubo un error.');
    }

}