//Rutas para crear usuarios; las rutas se importan en index.js
const express = require('express');//lo importamos para poder utilizar router
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')

//Crea un usuario, recibe una respuesta de tipo post hacia la url de abajo.
// api/usuarios
router.post('/', 
    usuarioController.crearUsuario //Carga el controlador y despues ejecuta la funcion que se llame
);
module.exports = router;
