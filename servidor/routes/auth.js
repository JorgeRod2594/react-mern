//Rutas para autenticar usuarios; las rutas se importan en index.js
const express = require('express');//lo importamos para poder utilizar router
const router = express.Router();
const authController = require('../controllers/authController')
const { check } = require('express-validator');//Librearia para crear nuestras reglas de validacion

//Crea un usuario, recibe una respuesta de tipo post hacia la url de abajo.
// api/usuarios
router.post('/', 
    [
        //check(atributo a validar, mensaje a mostrar en caso de error) que caracteristica validaré
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'La contraseña debe de ser mínimo de 6 caracteres').isLength({ min: 6 })
        //importamos el validation result en authController
    ],
    authController.autenticarUsuario
);

module.exports = router;