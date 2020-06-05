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
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor.');
    }
    
}