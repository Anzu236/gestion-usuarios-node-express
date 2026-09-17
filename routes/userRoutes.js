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
// CRUD DE USUARIOS
// ========================================


// Crear usuario
router.post(
    "/",
    userController.createUser
);


// Obtener todos
router.get(
    "/",
    userController.getUsers
);


// Obtener uno por ID
router.get(
    "/:id",
    userController.getUserById
);


// Actualizar usuario
router.put(
    "/:id",
    userController.updateUser
);


// Eliminar usuario
router.delete(
    "/:id",
    userController.deleteUser
);


// ========================================
// EXPORTAR ROUTER
// ========================================

module.exports = router;