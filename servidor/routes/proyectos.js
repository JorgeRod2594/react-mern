//Rutas para crear usuarios; las rutas se importan en index.js
const express = require('express');//lo importamos para poder utilizar router
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const { check } = require('express-validator');//Librearia para crear nuestras reglas de validacion

//Crea proyectos
// api/proyectos
router.post('/', 
    [
        //check(atributo a validar, mensaje a mostrar en caso de error) que caracteristica validaré
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('autor', 'Agrega un email valido').isEmail(),
        //importamos el validation result en usuarioController
    ],
    proyectoController.crearProyecto //Carga el controlador y despues ejecuta la funcion que se llame

);
module.exports = router;
