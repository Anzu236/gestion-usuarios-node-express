// ========================================
// RUTAS DE USUARIOS
// ========================================


// Importar Express
const express =
    require("express");


// Crear Router
const router =
    express.Router();


// Importar controlador
const userController =
    require("../controllers/userController");


// Importar middleware JWT
const {
    authenticateToken
} =
    require("../middlewares/authMiddleware");


// ========================================
// CREAR USUARIO
// POST /api/users
// ========================================
//
// Se mantiene disponible para las pruebas
// desarrolladas en módulos anteriores.

router.post(

    "/",

    userController.createUser

);


// ========================================
// TRANSACCIÓN
// POST /api/users/transaction
// ========================================
//
// Crear usuario + tarea en una
// transacción Sequelize.

router.post(

    "/transaction",

    userController.createUserWithTask

);


// ========================================
// OBTENER USUARIOS
// GET /api/users
// RUTA PROTEGIDA
// ========================================

router.get(

    "/",

    authenticateToken,

    userController.getUsers

);


// ========================================
// OBTENER USUARIO POR ID
// GET /api/users/:id
// ========================================

router.get(

    "/:id",

    userController.getUserById

);


// ========================================
// ACTUALIZAR USUARIO
// PUT /api/users/:id
// ========================================

router.put(

    "/:id",

    userController.updateUser

);


// ========================================
// ELIMINAR USUARIO
// DELETE /api/users/:id
// ========================================

router.delete(

    "/:id",

    userController.deleteUser

);


// ========================================
// EXPORTAR ROUTER
// ========================================

module.exports = router;