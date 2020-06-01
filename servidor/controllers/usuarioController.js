//Contiene los métodos asociados a los endpoints de usuario
//Este controller se importa en el modelo usuarios.js

//Como vamos a trabajar con express necesitamos pasarle un request y un response
exports.crearUsuario = (req, res) => {
    console.log(req.body); //req.body es lo que el usuario manda en el form
}
