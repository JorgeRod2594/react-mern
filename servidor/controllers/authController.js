//Este controller se importa en el modelo usuarios.js
const Usuario = require('../models/Usuario');
//importamos el package bcryptjs para comparar el password hasheado
const bcryptjs = require('bcryptjs');
//importamos validation result
const { validationResult } = require('express-validator');
//importamos jsonWebToken
const JWT = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res) => {

    //Revisamos si hay errores
    const errores = validationResult(req);
    //Si existen errores manda el status de fallo y el o los errores
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    
}
