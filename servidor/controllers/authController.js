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
    
    //Extraemos el email y password del request
    const { email, password } = req.body;

    try {
        //Revisar que sea un usuario registrado por medio de su email
        //si no existe
        let usuario = await  Usuario.findOne({ email })
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe.'});
        }
        //Si el usuario existe revisamos su password con bcryptjs que tiene 
        //un método para comparar el password (pass ingresado, pass en la DB)
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        //Si el password es incorrecto
        if(!passCorrecto ) {
            return res.status(400).json({msg: 'La contraseña es incorrecta'});
        }

        //***Si el usuario y existe & la contraseña es correcta damos acceso***
        //Creamos y firmamos el jsonwebtoken
        const payload = {
            //Guardamos datos del usuario que se esta guardando en usuario.save();
            usuario: {
                id: usuario.id
            }
        }
        //Firmarlo
        //firmamos con sing y pasamos el payload, la palabra secreta y la configuracion
        JWT.sign(payload, process.env.PSECRETA, {
            expiresIn: 3600 //El token expira en una hora representada en milisegundos
        }, (error, token) => { //Hacemos un call back con un arrow para revisar si hubo un error al crear el token
            if(error) 
                throw error; //Manda el error si existe

            //Si no, manda el token de confirmacion de operacion
            res.status(200).send({ token: token });
        });


    } catch (error) {
        console.log(error);
    }
}
