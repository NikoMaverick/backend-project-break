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
`

function getNavBar(isDashboard) {
    if (isDashboard) {
        return `
    <header>
        <nav class="navProduct" id="navProduct">
            <ul class="navProduct" id="navProduct">
                <li><a href="/dashboard">Home</a></li>
                <li><a href="/dashboard/chaqueta">Chaquetas</a></li>
                <li><a href="/dashboard/camiseta">Camisetas</a></li>
                <li><a href="/dashboard/gorra">Gorras</a></li>
                <li><a href="/dashboard/gafas">Gafas</a></li>
                <li><a href="/dashboard/casco">Cascos</a></li>
                <li><a href="/dashboard/new">Nuevo producto</a></li>
                <li><a href="/products">Cerrar Sesion</a></li>
            </ul>
        </nav>
    </header>
`
} 
else {
    return `
    <header>
        <nav class="navProduct" id="navProduct">
            <ul class="navProduct" id="navProduct">
                <li><a href="/products">Home</a></li>
                <li><a href="/products/chaqueta">Chaquetas</a></li>
                <li><a href="/products/camiseta">Camisetas</a></li>
                <li><a href="/products/gorra">Gorras</a></li>
                <li><a href="/products/gafas">Gafas</a></li>
                <li><a href="/products/casco">Casco</a></li>
                <li><a href="/dashboard/">Iniciar Sesión</a></li>
            </ul>
        </nav> 
    </header> 
`}
}

function getProductCards(products) {
    let html = '<section class="productCard id"productCard">';
    for (let product of products) {
      html += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <button class="homeBtn" onClick="window.location.href='/products/${product._id}'">Ver</button>
        </div>
      `;
    }
    return html;
  }


  function getProductCard(product) {
    let html = '<section class="productCard" id="productCard">';
      html += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Categoria: ${product.category}</p>
          <p>Talla: ${product.size}</p>
          <p><strong>${product.price}€</strong></p>
          <button class="homeBtn" onClick="window.location.href='/dashboard/${product._id}/edit'">Editar</button>
          <button class="homeBtn" id="deleteProduct">Borrar</button>
        </div>
        <script>
           document.addEventListener('DOMContentLoaded', function() {
           document.getElementById("deleteProduct").addEventListener('click', function(){
                console.log("estoy")
                fetch("/dashboard/${product._id}/delete", {
                method: 'DELETE', // Método DELETE
                headers: {
                    'Content-Type': 'application/json' 
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json(); 
            })
            .then(data => {
                console.log('Éxito:', data);
                alert('Producto eliminado correctamente');
                window.location.href = '/dashboard'; 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
           });
           });
        </script>
        
      `;
    
    return html;
  }

const showProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        const productCards = getProductCards(products);
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + productCards + '</section></body></html>';
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
        const html = baseHtml + getNavBar(isDashboard) + getProductCard(product) + '</section></body></html>';
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error accessing product", error});
    };
}


const showNewProduct = async (req, res) => {
    try {
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + `
                <h2>Crear Producto</h2>
                <div class="formProduct" id="formProduct">
                <form action="/dashboard" method="POST">

                    <label for="name">Producto</label>
                    <input type="text" id="name" name="name" required>

                    <label for="description">Descripción</label>
                    <textarea id="description" name="description" required></textarea>

                    <label for="category">Categoría</label>
                    <select name="category" class="categoryProduct" id="categoryProduct">
                        <option value="" disabled selected>Producto</option>
                        <option value="Chaqueta">Chaqueta</option>
                        <option value="Camiseta">Camiseta</option>
                        <option value="Gorra">Gorra</option>
                        <option value="Gafas">Gafas</option>
                        <option value="Casco">Casco</option>
                    </select>
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
                </div>

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


const createProduct = async (req, res) => {

    try {
        const { name, description, image, category, size, price } = req.body
        if (!name || !description|| !image || !category || !size || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await Product.create({
            name,
            description,
            image,
            category,
            size,
            price
        });
        res.redirect(`/dashboard/${product._id}`);
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
        const html = baseHtml + getNavBar() + `
                <h2>Editar Producto</h2>
                <form id="formEditProduct" action="/dashboard/${product._id}" method="PUT">

                    <label for="name">Producto</label>
                    <input type="text" id="name" name="name" value="${product.name}" required>

                    <label for="description">Descripción</label>
                    <textarea id="description" name="description" required>${product.description}</textarea>

                    <label for="image">Imagen</label>
                    <input type="file" id="image" name="image" value="${product.image}">

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
        <script>
            document.getElementById('formEditProduct').addEventListener('submit', function(event) {
                    event.preventDefault();

                    const formData = new FormData(this);

                    
                    const data = {};
                    formData.forEach((value, key) => {
                        data[key] = value;
                    });

                    fetch("/dashboard/${product._id}", {
                        method: 'PUT', // Cambia esto a PUT
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la respuesta de la red');
                        }
                        return response.json(); 
                    })
                    .then(data => {
                        console.log('Éxito:', data);
                        window.location.href="/dashboard/${product._id}"
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                });
        </script>
        </html>
        `;
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while accessing the product" });
    };
};

const updateProduct = async (req, res) => {
    try {
        let { name, description, image, category, size, price } = req.body;
        console.log(req)
        image = '';
        if (!name || !description || !category || !size || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            { 
                name, 
                description, 
                image, 
                category, 
                size, 
                price }, 
            { new: true } 
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    };
};


const deleteProduct = async (req, res) => {
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
}


const showProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({category: req.params.category}); 
        const productCards = getProductCards(products);
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + productCards + '</section></body></html>';
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error accessing products." });
    };
}


module.exports = {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct,
    showProductsByCategory
} 