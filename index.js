// Archivo principal que iniciará el servidor Express. Importa las rutas y las usa. También tiene que estar configurado para servir archivos estáticos y para leer el body de las peticiones de formularios.

const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const router = require('./routes/productRoutes');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/', router);

dbConnection()
  .then(() => {
    const PORT = process.env.PORT || 8010;
    app.listen(PORT, () => console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Error de conexión a la base de datos:', err);
  });