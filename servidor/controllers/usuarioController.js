//Contiene los métodos asociados a los endpoints de usuario
//Este controller se importa en el modelo usuarios.js
const Usuario = require('../models/Usuario');

//Como vamos a trabajar con express necesitamos pasarle un request y un response
exports.crearUsuario = async (req, res) => {
    //Utilizamos try / catch para el manejo de errores y saber que es lo que este pasando
    try {
        let usuario;

        //Crea el nuevo usuario
        usuario = new Usuario(req.body);

        //Guarda el usuario creado
        await usuario.save();
        //Mensaje de confirmacion de operacion
        res.status(200).send('Usuario creado correctamente.');

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
