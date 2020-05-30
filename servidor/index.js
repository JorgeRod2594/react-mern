//De momento node no soporta los imports por que definimos el servidor express de la siguiente manera:
const express = require('express');
//Importamos nuestra funcion
const conectarDB = require('./config/db'); //importamos el archivo de conexion a la db

//Creamos el servidor. Estaremos utilizando lo que se conocer como midleware
const app = express();

//Realizamos la conexion a la base de datos
conectarDB();

//Creamos el puerto para el servidor
const PORT = process.env.PORT || 4000;

//Definimos la pagina principal
app.get('/', (req, res) => {
    res.send('Hola mundo..')
})

//Arrancamos el servidor y mandara un mensaje con el puerto de conexion
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})
