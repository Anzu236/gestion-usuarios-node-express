// ========================================
// RUTAS DE SUBIDA DE ARCHIVOS
// ========================================


const express =
    require("express");


const router =
    express.Router();


// Middleware JWT
const {
    authenticateToken
} =
    require(
        "../middlewares/authMiddleware"
    );


// Middleware Multer
const {
    uploadSingleImage
} =
    require(
        "../middlewares/uploadMiddleware"
    );


// Controlador
const {
    uploadFile
} =
    require(
        "../controllers/uploadController"
    );


// ========================================
// SUBIR ARCHIVO
// POST /upload
// ========================================
//
// Ruta protegida mediante JWT.
//
// Campo multipart esperado:
//
// file
//

router.post(

    "/",

    authenticateToken,

    uploadSingleImage,

    uploadFile

);


// ========================================
// EXPORTAR ROUTER
// ========================================

module.exports = router;