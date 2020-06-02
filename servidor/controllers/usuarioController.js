//Contiene los métodos asociados a los endpoints de usuario
//Este controller se importa en el modelo usuarios.js
const Usuario = require('../models/Usuario');
//importamos el package bcryptjs
const bcryptjs = require('bcryptjs');
//importamos validation result
const { validationResult } = require('express-validator');
//importamos jsonWebToken
const JWT = require('jsonwebtoken');

//Como vamos a trabajar con express necesitamos pasarle un request y un response
exports.crearUsuario = async (req, res) => {
    //Utilizamos try / catch para el manejo de errores y saber que es lo que este pasando

    //Revisamos si hay errores
    const errores = validationResult(req);
    //Si existen errores manda el status de fallo y el o los errores
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    //Extraemos email y password con destructuring
    const { email, password } = req.body;

    try {
        //Validamos que el usuario registrado sea unico
        let usuario = await Usuario.findOne ({ email })
        //Utilizamos el modelo y utilizamos una función de mongoose para
        //ver si existe al menos un usuario que tenga el mismo email que se intenta registrar

        if (usuario) {
            return res.status(400).json({ msg: "Ya existe una cuenta asociada a este correo." })
            //Manejamos mensajes porque express validator retorna mensajes y se utilizan tambinén.
        }

        //Crea el nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el password del usuario
        const salt = await bcryptjs.genSalt(10);
        //salt nos genera un nuevo hash único asociado al password, si el salt es mayor a 10 consume mas memoria pero si se puede utilizar
        usuario.password = await bcryptjs.hash(password, salt);
        //bcryptjs.hash(el string que va a encriptar, el salt que definimos de tamaño 10.);

        //Guarda el usuario creado
        await usuario.save();

        //Crear y firmar el JWT
        //Crear el JWT
        //Como tenemos un token con el id del usuario cuando inicie sesion con ese id podemos 
        //hacer una consulta a la base de datos y traernos los proyectos creados por el.
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
        res.status(400).send('Hubo un error');
    }
}
