// Archivo que contendrá la configuración de la base de datos. Deberá conectarse a la base de datos de mongo en Atlas.


const mongoose = require('mongoose');
require('dotenv').config()

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("BBDD conectada correctamente")
        
    } catch (error) {
        console.error('No se ha podido conectar con la base de datos', error)
    }
};

module.exports = dbConnection

