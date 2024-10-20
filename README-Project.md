
# Creamos tienda online.
En este proyecto vamos a crear una tienda con productos online de ropa, pero puedes hacerlo como quieras, siempre y cuando cumplas con los minimos. Se creara una pagina para usuario y un dashboar para poder editar los productos de la pagina.

# Estructura del project (Los Bonus no los he podido realizar.)

├── config
│   ├── db.js
│   
│   ├── docs
│   
├── controllers
│   ├── productController.js
│   
├── models
│   └── Product.js
├── routes
│   └── productRoutes.js
│   
├── middlewares (BONUS)
│  
└── index.js
│   
├── public
│   ├── styles.css
│   └── assets
├── .env
└── package.json

# Los archivos y la estructura de cada uno.

- index.js - Este es el archivo principal inicio el servidor Express, inporto las rutas y las uso. Se requerir express y creamos la instancia con app. 
Requerimos las rutas y se crear el servidor. Se requiere el servidor cuando se tiene el acceso a BBDD.

- config/db.js - Aqui añadimos la configuración para conectarnos a la BBDD de Mongo DB en Atlas, requeriremos dotenv y se exportar.

- controllers/productController.js - Aqui añadimos la lógica crear las peticiones del CRUD para los productos de la tienda, se devuelven en formato html. Se exporta cada método y se requiere el modelo de esquema.

- models/Product.js - En este archivo crearemos nuestro esquema modelo con la definición del producto que queremos crear o editar. Requerimos mongoose y se exporta el esquema.
Este es un ejemplo de esquema, puedes añadir mas, pero minimo nombre, descripcion, imagen, categoria, talla y precio. Si tu tienda no es de ropa, lo modificas. 


- routes/productRoutes.js - En este archivo tendremos todas las rutas con los CRUD para los productos, donde llmaran al los métodos que definas en controllerProduct en el controlador.

- .env - En este archivo deberas añadir tu variable de entorno que tendras que meter en .gitignore. Sera la URI para acceder a BBDD. Mas adelante tendras que usarla para subir tu project a Render.

- .gitignore - Aqui añadiremos las variables de entorno y los archivos que no sean necesarios para el project.

- public/style.css - Aqui añadimos nuestros estilos con css.

- public/assets - Aqui añadimos nuestras fotos para los estilos de css.

- docs - Aqui estan lo ejemplos de como debe quedar la tienda. 


# Instalación de las dependencias:
 - npm init -y (Inicializamos nuestro proyecto)
 - npm i express dotenv mongoose -E (Instalamos las 3 dependencias a la vez de express, dotenv y moongose sin el caret)
 - Añadir "start": "node --watch index.js" en el "scripts" de package.json (Para levantar el servidor)
 - Al añadir las dependencias, se creara el archivo package.json que añadiremos en .gitignore.


 # Creamos las rutas.

 Una vez que tengamos levantado el servidor y hemos accedido a la BBDD, crearemos las rutas y los conttroladores. Probaremos cada ruta en POSTMAN. 

 Las rutas, junto con su método, se desarrollan en productController, serán las siguientes:

1. router.get('/', productController.showProducts);
   router.get('/products', productController.showProducts);
Estas 2 rutas devolverán todos los productos, la primera "/" será para que Render se inicie correctamente en tu página principal.

2. router.get('/products/:productId', productController.showProductById); 
Esta ruta devuelve cada producto por su ID con todas su caracteristicas (Su esquema).

3. router.get('/products/category/:category', productController.showProductsByCategory);
Esta ruta devuelve todos los productos de la misma categoría.

4. router.get('/dashboard', productController.showProducts); 
Esta ruta devuelve todos los productos, será la página principal del dashboard.

5. router.get('/dashboard/new', productController.showNewProduct); 
Esta ruta devolverá un formulario para crear un nuevo producto.

6. router.get('/dashboard/category/:category', productController.showProductsByCategory); 
Esta ruta devuelve todos los productos de la misma categoría del dashboard.

7. router.post('/dashboard', productController.createProduct); 
Esta ruta crea un producto nuevo dentro del dashboard.

8. router.get('/dashboard/:productId', productController.showProductById); 
Esta ruta devuelve cada producto por su ID con todas su caracteristicas (Su esquema) en el dashboard.

9. router.get('/dashboard/:productId/edit', productController.showEditProduct); 
Esta ruta devolverá un formulario para aditar un producto.

10. router.put('/dashboard/:productId', productController.updateProduct); 
Esta ruta actualiza el producto. 

11. router.delete('/dashboard/:productId/delete', productController.deleteProduct); 
Esta ruta elimina el producto. 


# Creación de los controladores.
En controllers/productController.js creamos los controladores para los CRUD de productRoutes. A parte de los métodos, se crean funciones para que la devolución sea correcta. Las repuestas serán en formato html.

Estas son las funciones asociadas a las rutas que están en el punto anterior con su explicación. :

1. showProducts:
2. showProductById:
3. showNewProduct:
4. createProduct:
5. showEditProduct: 
En este método, añadimos un script para gestionar el formulario y la lógica para actualizar el producto. FormData recoge todos los dato recogidos del usuario. Tambien realizamos la petición de PUT con fetch. El headers indica que los datos contienen formato json.
6. updateProduct: 
7. deleteProduct:
8. showProductsByCategory


Se pueden crear funciones dentro del mismo archivo que ayuden a crear el html, por ejemplo:

- baseHtml: El html contiene el códido común para todas las rutas, incluidos estilos. 

- getNavBar: 
Creamos la función para generar las categorias de los productos, y dependiendo de si estamos en el dashboard o no, nos generará un nav diferente. El logo del header lleva a la página principal "/" y el home del nav lleva a la pagina principal dependiendo de si estas en el cliente o el dashboard.

- getProductCards: 
Esta función genera todos los productos y los devuelve en html, donde tambien creamos un boton para ver el producto por si ID

- getProductCard:
Esta función genera el producto por si ID tras pulsar el boton de "Ver". Nos trae todas las caracteristicas del producto para editarla o eliminarla dentro unicamente del dashboard.
Dentro de esta función, creamos un script para la eliminación del producto. 


# Desplieque del project.
En Render.com, se crea un nuevo proyecto en base a nuestro repositorio en GitHub, donde añadimos las variables de entorno. 

# Documentación.
En base a mi proyecto, documento los pasos que he siguido. 
A partir de aqui, no he podido realizar los bonus, por lo que no puedo documentarlo. 



