// Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. Devolverá las respuestas en formato HTML. (Es un constructor) 
const Product = require('../models/Product');

const baseHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../public/style.css">
    <title>Top Gun Store</title>
</head>
<body>
    <header>
        <button class="homeBtn" onClick="window.location.href='/dashboard'">Home</button>
        <button class="session" type="submit">Cerrar sesión</button>
    </header>
`

function getNavBar(isDashboard) {
    if (isDashboard) {
        return `
    <nav class="navProduct" id="navProduct">
        <ul class="navProduct" id="navProduct">
            <li><a href="/dashboard">Productos</a></li>
            <li><a href="">Chaquetas</a></li>
            <li><a href="">Camisetas</a></li>
            <li><a href="">Gorras</a></li>
            <li><a href="">Accesorios</a></li>
            <li><a href="">Nuevo producto</a></li>
            <li><a href="">Loging</a></li>
        </ul>
    </nav>  
`
} 
else {
    return `
    <nav class="navProduct" id="navProduct">
        <ul class="navProduct" id="navProduct">
            <li><a href="/products">Productos</a></li>
            <li><a href="">Chaquetas</a></li>
            <li><a href="">Camisetas</a></li>
            <li><a href="">Gorras</a></li>
            <li><a href="">Accesorios</a></li>
        </ul>
    </nav>  
`}
}

function getProductCards(products) {
    let html = '<section class="productCard id"productCard">';
    for (let product of products) {
      html += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <a href="/products/${product._id}">Ver producto</a>
        </div>
        </section>
      `;
    }
    return html;
  }

  function getProductCard(product) {
    let html = '<section class="productCard id"productCard">';
      html += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Categoria: ${product.category}</p>
          <p>Talla: ${product.size}</p>
          <p><strong>${product.price}€</strong></p>
        </div>
        </section>
      `;
    
    return html;
  }

const showProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        const productCards = getProductCards(products);
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + productCards + '</body></html>';
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error accessing products." });
    };
}

const showProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(!product) {
            return res.status(400).json({ messenge: "Product not found" })
        }
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + getProductCard(product) + '</body></html>';
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error accessing product", error});
    };
}


const showNewProduct = async (req, res) => {
    try {
        const html = baseHtml + getNavBar() + `
                <h2>Crear Producto</h2>
                <form class="formProduct" id="formProduct" action = "/dashboard" method="POST" enctype="multipart/form-data">

                    <label for="name">Producto</label>
                    <input type="text" id="name" name="name" required>

                    <label for="description">Descripción</label>
                    <textarea id="description" name="description" required></textarea>

                    <label for="category">Categoría</label>
                    <select name="size" class="categoryProduct" id="categoryProduct">
                        <option value="" disabled selected>Producto</option>
                        <option value="Jacket">Chaqueta</option>
                        <option value="T-shirt">Camiseta</option>
                        <option value="Cap">Gorra</option>
                        <option value="Accessory">Accesorio</option>
                    </select>
                    <input type="text" id="category" name="category" required>

                    <label for="image">Imagen</label>
                    <input type="file" id="image" name="image">

                    <label for="size">Talla</label>
                    <select name="size" class="sizeProduct" id="sizeProduct">
                        <option value="" disabled selected>Talla</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                    

                    <label for="price">Precio</label>
                    <input type="number" id="price" name="price" required>

                    <button type="submit">Crear producto</button>
                </form>
            </main>
        </body>
    </html>
    `;
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "The form cannot be accessed"});
    }
    
};
// Repasar, no entra
const createProduct = async (req, res) => {
    try {
        const { name, description, image, category, size, price } = req.body;
        if (!name || !description|| !image || !category || !size || !price) {
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
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating the product" });
    };
};


const showEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // En el HTML añadimos el value para que los datos aparezcan rellenados con los datos para actualizar
        const html = baseHtml + getNavBar() + `
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
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while accessing the product" });
    };
};




module.exports = {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct
} 