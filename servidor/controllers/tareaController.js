const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//Obtiene todos las tareas del proyecto actual
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