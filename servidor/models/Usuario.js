const mongoose = require ('mongoose');

//Definimos la estructura de la base de datos con Schema
const UsuariosSchema = mongoose.Schema({
    //Le pasamos un objeto con la configuracion y forma del schema de usuario
    //Aqui definimos que campos necesitamos que tenga nuestra vista
    nombre: {
        type: String,
        required: true,
        trim: true //Para eliminar los espacios en blanco al inicio y al final
    },
    email: {
        type: String,
        required: true,
        trim: true, //Para eliminar los espacios en blanco al inicio y al final
        unique: true //Para no tener dos usuarios con el mismo correo
    },
    password: {
        type: String,
        required: true,
        trim: true //Para eliminar los espacios en blanco al inicio y al final
    },
    registro: {
        type: Date,
        default: Date.now()//Nos da una fecha en el momento que se registró el usuario
    }

})

module.exports = mongoose.model('Usuario', UsuariosSchema)//Exportamos el modelo creado y el schema