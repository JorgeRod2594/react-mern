const mongoose = require('mongoose');

const tareaShema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false,
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,//Este es el _id que genera mongo em la base de datos.
        ref: 'Proyecto', //Esta es la referencia al modelo usuario para poder obtener el Id
    },
    creado: {
        type: Date,
        default: Date.now()//Nos da una fecha en el momento que se crea la tarea
    },

})

module.exports = mongoose.model('Tarea', tareaShema);