// ========================================
// RUTAS DE ROLES
// ========================================


const express =
    require("express");


const router =
    express.Router();


const roleController =
    require("../controllers/roleController");


// ========================================
// CREAR ROL
// POST /api/roles
// ========================================

router.post(

    "/",

    roleController.createRole

);


// ========================================
// LISTAR ROLES
// GET /api/roles
// ========================================

router.get(

    "/",

    roleController.getRoles

);


// ========================================
// ASIGNAR ROL
// POST /api/roles/assign
// ========================================

router.post(

    "/assign",

    roleController.assignRole

);


// ========================================
// ROLES DE UN USUARIO
// GET /api/roles/user/:userId
// ========================================

router.get(

    "/user/:userId",

    roleController.getUserRoles

);


// ========================================
// QUITAR ROL
// DELETE /api/roles/:roleId/users/:userId
// ========================================

router.delete(

    "/:roleId/users/:userId",

    roleController.removeRole

);


// ========================================
// EXPORTAR ROUTER
// ========================================

module.exports = router;