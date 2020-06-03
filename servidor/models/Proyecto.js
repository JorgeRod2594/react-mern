const mongoose = require('mongoose');
//Definimos la estructura de la base de datos con Schema
const ProyectoShema = mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        trim: true //Para eliminar los espacios en blanco al inicio y al final
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,//Este es el _id que genera mongo em la base de datos.
        ref: 'Usuario', //Esta es la referencia al modelo usuario para poder obtener el Id
    },
    creado: {
        type: Date,
        default: Date.now()//Nos da una fecha en el momento que se crea el proyecto
    },
})

module.exports = mongoose.model('Proyecto', ProyectoShema)