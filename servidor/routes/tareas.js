//Rutas para crear usuarios; las rutas se importan en index.js
const express = require('express');//lo importamos para poder utilizar router
const router = express.Router();
const tareaController = require('../controllers/tareaController')
const { check } = require('express-validator');//Librearia para crear nuestras reglas de validacion
const autentification = require('../middleware/autentification');

//Obtener todos los proyectos
// api/tareas
router.post('/', 
    autentification,//Verifica primero si el usuario esta logueado utilizando el middleware y el token
    //Si esta logueado pasa a crear el proyecto.
    [
        check('nombre', 'El nombre de la tarea es necesario').not().isEmpty()
    ],
    tareaController.crearTarea //Carga el controlador y despues ejecuta la funcion que se llame

);

module.exports = router;
