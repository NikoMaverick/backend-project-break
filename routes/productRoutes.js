// Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productController')


router.get('/products', productController.showProducts); // 1.
router.get('/products/:productId', productController.showProductById); // 2.

router.get('/dashboard', productController.showProducts); // 3.
router.get('/dashboard/new', productController.showNewProduct); // 4.

router.post('/dashboard', productController.createProduct); // 5.

router.get('/dashboard/:productId', productController.showProductById); // 6.
router.get('/dashboard/:productId/edit', productController.showEditProduct); // 7.

router.put('/dashboard/:productId', productController.updateProduct); // 8.

router.delete('/dashboard/:productId/delete', productController.deleteProduct); // 9.

router.get('/products/category/:category', productController.showProductsByCategory); // 11.
router.get('/dashboard/category/:category', productController.showProductsByCategory); // 10.


module.exports = router

// 1. GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
// 11. GET Devuelve todas las categorias de products
// 2. GET /products/:productId: Devuelve el detalle de un producto.

// 3. GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
// 10. GET Devuelve todas las categorias del dashboard
// 4. GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.

// 5. POST /dashboard: Crea un nuevo producto.

// 6. GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
// 7. GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

// 8. PUT /dashboard/:productId: Actualiza un producto.

// 9. DELETE /dashboard/:productId/delete: Elimina un producto.
