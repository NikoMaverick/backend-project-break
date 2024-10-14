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
        <button type="submit">Cerrar sesión</button>
    </header>
`

function getNavBar(isDashboard) {
    if (isDashboard) {
        return `
    <nav>
        <ul>
            <li><a href="">Productos</li>
            <li><a href="">Chaquetas</li>
            <li><a href="">Camisetas</li>
            <li><a href="">Gorras</li>
            <li><a href="">Accesorios</li>
            <li><a href="">Nuevo producto</li>
            <li><a href="">Loging</li>
        </ul>
    </nav>  
`
} 
else {
    return `
    <nav>
        <ul>
            <li><a href="">Productos</li>
            <li><a href="">Chaquetas</li>
            <li><a href="">Camisetas</li>
            <li><a href="">Gorras/li>
            <li><a href="">Accesorios/li>
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
          <p>${product.description}</p>
          <p>${product.category}</p>
          <p>${product.size}</p>
          <p><strong>${product.price}€</strong></p>
          <a href="/products/${product._id}">Ver detalle</a>
        </div>
        </section>
      `;
    }
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
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + '</body></html>';
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error accessing product", error});
    };
}





module.exports = {
    showProducts,
    showProductById,
} 