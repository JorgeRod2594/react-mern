const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'}) //Busca el archivo de variables dentro del proyecto

const conectarDB = async () => {
    try{
        //connect toma como 1er parametro la url a donde se conectará que podemos leer utilizando dotenv
        //y el segundo es un objeto de configuracion 
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false //Los tres se utilizan para el manejo de errores en los parser
        });  
        //Como nuestra funcion es asincrona utilizamos await para la conexion
        console.log('Conexión a la DB exitosa.')

    } catch (error) {
        console.log(error);
        process.exit(1)// Esto detiene la app en caso de tener un error
    }
}

module.exports = conectarDB;
