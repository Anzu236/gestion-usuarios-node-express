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


// ========================================
// CREAR USUARIO
// POST /api/users
// ========================================

router.post(

    "/",

    userController.createUser

);


// ========================================
// TRANSACCIÓN:
// CREAR USUARIO + TAREA
// POST /api/users/transaction
// ========================================

router.post(

    "/transaction",

    userController.createUserWithTask

);


// ========================================
// OBTENER USUARIOS
// GET /api/users
// ========================================

router.get(

    "/",

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