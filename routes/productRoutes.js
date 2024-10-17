// Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productController')


// 1. GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get('/products', productController.showProducts);

// 2. GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.get('/dashboard', productController.showProducts);

// 11. GET Devuelve todas las categorias de products
router.get('/products/category:category', productController.showProductsByCategory);

// 3. GET /products/:productId: Devuelve el detalle de un producto.
router.get('/products/:productId', productController.showProductById);

// 4. GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.get('/dashboard/new', productController.showNewProduct);

// 5. GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get('/dashboard/:productId', productController.showProductById)

// 6. POST /dashboard: Crea un nuevo producto.
router.post('/dashboard', productController.createProduct);

// 7. GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
router.get('/dashboard/:productId/edit', productController.showEditProduct);

// 8. PUT /dashboard/:productId: Actualiza un producto.
router.put('/dashboard/:productId', productController.updateProduct)

// 9. DELETE /dashboard/:productId/delete: Elimina un producto.
router.delete('/dashboard/:productId/delete', productController.deleteProduct)

// 10. GET Devuelve todas las categorias del dashboard
router.get('/dashboard/category:category', productController.showProductsByCategory);


module.exports = router
