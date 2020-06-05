//Rutas para crear usuarios; las rutas se importan en index.js
const express = require('express');//lo importamos para poder utilizar router
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const { check } = require('express-validator');//Librearia para crear nuestras reglas de validacion
const autentification = require('../middleware/autentification');

//Crea proyectos
// api/proyectos
router.post('/',
    autentification,//Verifica primero si el usuario esta logueado utilizando el middleware y el token
    //Si esta logueado pasa a crear el proyecto.
    [
        check('nombre', 'El nombre del proyecto es necesario').not().isEmpty()
    ],
    proyectoController.crearProyecto //Carga el controlador y despues ejecuta la funcion que se llame

);

//Obtener todos los proyectos
router.get('/', 
    autentification,//Verifica primero si el usuario esta logueado utilizando el middleware y el token
    //Si esta logueado pasa a crear el proyecto.
    proyectoController.obtenerProyectos //Carga el controlador y despues ejecuta la funcion que se llame

);

//Actualizar un proyecto via ID
router.put('/:id', 
    autentification,//Verifica primero si el usuario esta logueado utilizando el middleware y el token
    //Si esta logueado pasa a crear el proyecto.
    [
        check('nombre', 'El nombre del proyecto es necesario').not().isEmpty()
    ],
    proyectoController.actualizarProyecto //Carga el controlador y despues ejecuta la funcion que se llame

);

module.exports = router;
