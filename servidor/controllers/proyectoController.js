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
