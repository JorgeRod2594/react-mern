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
        check('nombre', 'El nombre de la tarea es necesario').not().isEmpty(),
        check('proyecto', 'La tarea debe de estar asociada a un pryecto.').not().isEmpty()
    ],
    tareaController.crearTarea //Carga el controlador y despues ejecuta la funcion que se llame

);

//Obtener las tareas de un proyecto por medio de id
router.get('/',
    autentification,
    tareaController.obtenerTareas

);

//Actualizar una tarea via ID
router.put('/:id', 
    autentification,//Verifica primero si el usuario esta logueado utilizando el middleware y el token
    //Si esta logueado pasa a crear el proyecto.
    [
        check('nombre', 'El nombre de la tarea es necesario').not().isEmpty()
    ],
    tareaController.actualizarTarea //Carga el controlador y despues ejecuta la funcion que se llame

);

//Eliminar un proyecto
router.delete('/:id',
    autentification,
    tareaController.eliminarTarea
);

module.exports = router;
