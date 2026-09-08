// ========================================
// ARCHIVO PRINCIPAL DE LA APLICACIÓN
// ========================================


// Cargar variables de entorno
require("dotenv").config();


// Importar Express
const express = require("express");


// Importar el módulo path
const path = require("path");


// Importar las rutas principales
const indexRoutes =
    require("./routes/indexRoutes");


// Crear aplicación Express
const app = express();


// Obtener puerto desde .env
const PORT =
    process.env.PORT || 3000;


// ========================================
// MIDDLEWARES GENERALES
// ========================================


// Permite recibir información JSON
app.use(
    express.json()
);


// Permite recibir datos provenientes
// de formularios HTML.
app.use(
    express.urlencoded({
        extended: true
    })
);


// ========================================
// ARCHIVOS ESTÁTICOS
// ========================================

// Indicamos a Express que todo lo
// almacenado dentro de /public
// puede ser solicitado directamente
// desde el navegador.
app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);


// ========================================
// RUTAS
// ========================================

// Conectamos nuestras rutas externas
// con la aplicación.
app.use(
    "/",
    indexRoutes
);


// ========================================
// RUTA NO ENCONTRADA
// ========================================

// Si ninguna ruta anterior coincide,
// devolvemos error HTTP 404.
app.use(
    (req, res) => {

        res.status(404).json({

            status: "error",

            message: "Ruta no encontrada",

            data: null

        });

    }
);


// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(
    PORT,
    () => {

        console.log(
            `Servidor iniciado en http://localhost:${PORT}`
        );

    }
);