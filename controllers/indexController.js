// ========================================
// CONTROLADOR PRINCIPAL
// ========================================

// Este archivo contiene la lógica que se
// ejecutará cuando el usuario acceda a
// nuestras rutas principales.


// ========================================
// CONTROLADOR DE LA RUTA /
// ========================================

const home = (req, res) => {

    res.send(`
        <!DOCTYPE html>

        <html lang="es">

        <head>

            <meta charset="UTF-8">

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <title>Gestión de Usuarios</title>

            <link
                rel="stylesheet"
                href="/styles.css"
            >

        </head>

        <body>

            <main class="container">

                <h1>
                    Gestión de Usuarios
                </h1>

                <p>
                    Aplicación backend desarrollada
                    con Node.js y Express.
                </p>

                <p>
                    El servidor se encuentra
                    funcionando correctamente.
                </p>

                <a href="/status">
                    Consultar estado del servidor
                </a>

            </main>

        </body>

        </html>
    `);

};


// ========================================
// CONTROLADOR DE LA RUTA /status
// ========================================

const status = (req, res) => {

    res.status(200).json({

        status: "success",

        message:
            "Servidor funcionando correctamente",

        data: {

            application:
                "Gestión de Usuarios",

            environment:
                process.env.NODE_ENV || "development",

            uptimeSeconds:
                Math.floor(process.uptime()),

            timestamp:
                new Date().toISOString()

        }

    });

};


// ========================================
// EXPORTAR CONTROLADORES
// ========================================

module.exports = {

    home,
    status

};