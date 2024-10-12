// Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');



router.get('/', (req, res) => {
    res.json({mensaje: 'Hola Mundo'})
});

module.exports = router


/* 

router.post('/create', async (req, res) => {
    try {
        const newProduct = new TextTrackList(require.body);
    } catch (error) {
        
    }
});

*/