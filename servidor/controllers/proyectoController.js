const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async(req, res) => {

    try {

        //Creamos un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        proyecto.save();

        //Cuando todo este completo mandamos el nuevo proyecto creado
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
