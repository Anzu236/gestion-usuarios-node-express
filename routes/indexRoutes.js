// ========================================
// RUTAS PRINCIPALES
// ========================================

// Importamos Express
const express = require("express");


// Creamos un router de Express
const router = express.Router();


// Importamos nuestros controladores
const indexController =
    require("../controllers/indexController");


// Importamos el middleware encargado
// de registrar las visitas.
const accessLogger =
    require("../middlewares/accessLogger");


// ========================================
// RUTA PRINCIPAL
// ========================================

router.get(
    "/",
    accessLogger,
    indexController.home
);


// ========================================
// RUTA DE ESTADO
// ========================================

router.get(
    "/status",
    accessLogger,
    indexController.status
);


// ========================================
// EXPORTAR ROUTER
// ========================================

module.exports = router;