// Archivo principal que iniciará el servidor Express. Importa las rutas y las usa. También tiene que estar configurado para servir archivos estáticos y para leer el body de las peticiones de formularios.

const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const router = require('./routes/productRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

dbConnection();

const PORT = 8010
app.listen(PORT, () => console.log(`La aplicación esta escuchando en el puerto http://localhost:${PORT}`));
