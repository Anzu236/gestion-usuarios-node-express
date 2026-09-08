// ========================================
// MIDDLEWARE DE REGISTRO DE ACCESOS
// ========================================

// Módulo nativo de Node.js utilizado
// para trabajar con archivos.
const fs = require("fs");


// Módulo para trabajar con rutas
// de archivos y carpetas.
const path = require("path");


// Construimos la ruta absoluta
// hacia logs/log.txt.
const logFilePath = path.join(
    __dirname,
    "..",
    "logs",
    "log.txt"
);


// ========================================
// MIDDLEWARE
// ========================================

const accessLogger = (req, res, next) => {

    // Obtenemos fecha y hora actuales.
    const fechaActual = new Date();


    const fecha =
        fechaActual.toLocaleDateString("es-CL");


    const hora =
        fechaActual.toLocaleTimeString("es-CL");


    // Creamos la línea que será
    // almacenada en log.txt.
    const registro =
        `${fecha} | ${hora} | ${req.method} ${req.originalUrl}\n`;


    // Agregamos el registro al archivo.
    fs.appendFile(
        logFilePath,
        registro,
        "utf8",
        (error) => {

            if (error) {

                console.error(
                    "Error al registrar acceso:",
                    error
                );

            }

        }
    );


    // Permitimos que Express continúe
    // con la siguiente función.
    next();

};


// ========================================
// EXPORTAR MIDDLEWARE
// ========================================

module.exports = accessLogger;