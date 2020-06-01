//Contiene los métodos asociados a los endpoints de usuario
//Este controller se importa en el modelo usuarios.js
const Usuario = require('../models/Usuario');
//importamos el package bcryptjs
const bcryptjs = require('bcryptjs');
//importamos validation result
const { validationResult } = require('express-validator');

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
        //Mensaje de confirmacion de operacion
        res.status(200).send({ msg: 'Usuario creado correctamente.' });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
