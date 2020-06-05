const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async(req, res) => {

    //Revisamos si hay errores
    const errores = validationResult(req);
    //Si existen errores manda el status de fallo y el o los errores
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {

        //Creamos un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        //Guardar el creador del proyecto vía JWT
        //proyecto.autor: Viene del modelo Proyecto
        //El valor que le asignamos viene de nuestro middleware autentification (req.usuario).
        //y solo nos interesa obtener el id del usuario logueado.
        proyecto.autor = req.usuario.id
        //Guardamos el proyecto creado
        proyecto.save();
        //Cuando todo este completo mandamos el nuevo proyecto creado.
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

//Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {

    try {
        //++++++++ Consulta en mongo ++++++++++
        //Obtenemos todos los proyectos por medio del id del usuario que viene en el token
        //const proyectos = await Modelo.metodobuscar({ parametro del modelo = usuario que se anexa en auth})
        const proyectos = await Proyecto.find({ autor: req.usuario.id }).sort({ creado: -1});
        res.json({ proyectos }); //Mandamos el json de respuesta
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');
    }
    
}

//Actualiza un proyecto seleccionado
exports.actualizarProyecto = async (req, res) => {
    
    //Revisamos si hay errores
    const errores = validationResult(req);
    //Si existen errores manda el status de fallo y el o los errores
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    //Extraer la informacion del proyecto
    const { nombre } = req.body; //obtenemos los datos del proyecto
    const proyectoActualizado = {};//Aqui se almacenará el proyecto actualizado

    //Añadimos más if si queremos validar más datos
    if(nombre) {
        proyectoActualizado.nombre = nombre; //Asignamos el dato al nuevo array
    }

    
    try {
        //Revisar el ID
        //Buscamos el id que le estemos pasando como parametro
        //Esto es una consulta a la base de datos, por lo que en cada consulta 
        //debemos utilizar un await en una función asíncrona.
        let proyecto = await Proyecto.findById(req.params.id);

        //Verificar si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //Verificar el creador del proyecto
        if(proyecto.autor.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //Actualizar
        //Consulta mongo: buscar y actualizar where id = req.params.id, con que lo actualizaremos, indicamos que es true
        proyecto = await Proyecto.findByIdAndUpdate( {_id: req.params.id }, {$set: proyectoActualizado },{new: true} )

        //Retornamos el json de respuesta
        res.json({ proyecto });
        
    } catch (error) {
        console.log(error);
        res.status(500).send( 'Error en el servidor.' );
    }

}

//Eliminar un proyecto por su id
exports.eliminarProyecto = async (req, res) => {

    //Revisamos si hay errores
    const errores = validationResult(req);
    //Si existen errores manda el status de fallo y el o los errores
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    //Extraer la informacion del proyecto
    const { nombre } = req.body; //obtenemos los datos del proyecto

    try {

        //Revisamos el ID
        let proyecto = await Proyecto.findById(req.params.id);

        //Verificar si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //Verificar el creador del proyecto
        if(proyecto.autor.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //Eliminamos el proyecto
        proyecto = await Proyecto.findOneAndRemove( {_id: req.params.id} )
        
        //Retornamos el json de respuesta
        res.json({ msg: 'Proyecto eliminado.' });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor.');
    }

}

