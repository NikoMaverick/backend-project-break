
# Project

# Creamos las carpetas y los archivos con la siguiente estructura:
- index.js - (Este es el archivo principal donde iniciamos el servidor Express, importamos las rutas y las usamos.)
- config/db.js - (Aqui añadimos la configuración para conectarnos a la BBDD de Mongo DB en Atlas)
- controllers/productController.js - (Aqui añadimos la lógica para manejar las solicitudes CRUD de los productos y devolverlas en formato HTML)
- models/Product.js - (Aqui tendremos el modelo con la definición del esquema del producto usado en mongoose)
- routes/productRoutes.js - (Aqui tendremos la definición del CRUD para los productos y llamar a los métodos del controlador)
- .env - (Aqui añadiremos la varible de entorno, nuestra URI para acceder a la BBDD)
- .gitignore - (Aqui añadiremos los archivos que no son necesarios para el project)



# Instalamos las dependencias:
 - npm init -y
 - npm i express dotenv mongoose -E
 - Añadir "start": "node --watch index.js" en el "scripts" de package.json
 - Al añadir las dependencias, se creara el archivo package.json que añadiremos en .gitignore


 # 

