// Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productController')


// 1. GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get('/products', productController.showProducts);

// 3. GET /products/:productId: Devuelve el detalle de un producto.
router.get('/products/:productId', productController.showProductById);

// 2. GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.get('/dashboard', productController.showProducts);

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

/*
// 1. GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get("/products", async(req,res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error accessing products." });
    };
});*/

/*
// 2. GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.get('/dashboard', async(req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error accessing products." });
    };
});*/

/*
// 3. GET /products/:productId: Devuelve el detalle de un producto.
router.get('/products/:productId', async(req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error accessing product."});
    };
})*/

/*
// 4. GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.get('/dashboard/new', async (req, res) => {
    try {
        const formProductHtml = `
        <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create new product</title>
</head>
<body>
    <header>
        <button class="homeBtn" onClick="window.location.href='/dashboard'">Home</button>
        <button type="submit">Cerrar sesión</button>
    </header>
    <main>
        <h2>Crear Producto</h2>
        <form action = "/dashboard" method="POST" enctype="multipart/form-data">

            <label for="name">Producto</label>
            <input type="text" id="name" name="name" required>

            <label for="description">Descripción</label>
            <textarea id="description" name="description" required></textarea>

            <label for="image">Imagen</label>
            <input type="file" id="image" name="image" required>
            
            <label for="category">Categoría</label>
            <input type="text" id="category" name="category" required>

            <label for="size">Talla</label>
            <input type="text" id="size" name="size" required>

            <label for="price">Precio</label>
            <input type="number" id="price" name="price" required>

            <button type="submit">Crear producto</button>
        </form>
    </main>
</body>
</html>
        `;
        res.send(formProductHtml);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "The form cannot be accessed"});
    }
});*/

/*
// 5. GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get('/dashboard/:productId', async(req, res) => {
    console.log('Estoy')
    try {
        const product = await Product.findById(req.params.productId);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error accessing product."});
    };
})*/




/*
// 6. POST /dashboard: Crea un nuevo producto.
router.post('/dashboard', async (req, res) => {
    try {
        const { name, description, image, category, size, price } = req.body;

        if (!name || !description || !category || !size || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProduct = await Product.create({
            name,
            description,
            image,
            category,
            size,
            price
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
});*/

/*
// 7. GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
router.get('/dashboard/:productId/edit', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // En el HTML añadimos el value para que los datos aparezcan rellenados con los datos para actualizar
        const editFormHtml = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Edit product</title>
        </head>
        <body>
            <header>
                <button class="homeBtn" onClick="window.location.href='/dashboard'">Home</button>
                <button type="submit">Cerrar sesión</button>
            </header>
            <main> 
                <h2>Editar Producto</h2>
                <form action="/dashboard/${product._id}?_method=PUT" method="POST" enctype="multipart/form-data">

                    <label for="name">Producto</label>
                    <input type="text" id="name" name="name" value="${product.name}" required>

                    <label for="description">Descripción</label>
                    <textarea id="description" name="description" required>${product.description}</textarea>

                    <label for="image">Imagen</label>
                    <input type="file" id="image" name="image" value="${product.image} required">

                    <label for="category">Categoría</label>
                    <input type="text" id="category" name="category" value="${product.category}" required>

                    
                    <label for="size">Talla</label>
                    <input type="text" id="size" name="size" value="${product.size}" required>

                    <label for="price">Precio</label>
                    <input type="number" id="price" name="price" value="${product.price}" required>

                    <button type="submit">Actualizar producto</button>
                </form>
            </main>
        </body>
        </html>
        `;
        res.send(editFormHtml);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while accessing the product" });
    }
});*/

/*
// 8. PUT /dashboard/:productId: Actualiza un producto.
router.put('/dashboard/:productId', async (req, res) => {
    try {
        const { name, description, image, category, size, price } = req.body;
        // Nos aseguramos que todos los campos esten pretresentes
        if (!name || !description || !image || !category || !size || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Actualizamos el producto
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            { 
                name, 
                description, 
                image, 
                category, 
                size, 
                price }, 
            { new: true } // Devuelvemos el producto actualizado
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    }
});*/


// 9. DELETE /dashboard/:productId/delete: Elimina un producto.
router.delete('/dashboard/:productId/delete', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" });
    }
});

module.exports = router


