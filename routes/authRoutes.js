// ========================================
// RUTAS DE AUTENTICACIÓN
// ========================================


// Importar Express
const express =
    require("express");


// Crear router
const router =
    express.Router();


// Importar controlador
const authController =
    require("../controllers/authController");


// ========================================
// REGISTRO
// POST /api/auth/register
// ========================================

router.post(
    "/register",
    authController.register
);


// ========================================
// LOGIN
// POST /api/auth/login
// ========================================

router.post(
    "/login",
    authController.login
);


// ========================================
// EXPORTAR ROUTER
// ========================================

module.exports = router;