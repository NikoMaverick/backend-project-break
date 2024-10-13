// Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.get('/products', async (req, res) => {
    res.json({mensaje: 'Hola Mundo'})
});




module.exports = router


/*




router.post('/dashboard', async (req, res) => {
    try {
        const newProduct = await Product.create
    } catch (err) {
        console.log('Error al crear', err)
    }
});
*/