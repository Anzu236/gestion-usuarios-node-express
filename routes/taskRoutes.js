// ========================================
// RUTAS DE TAREAS
// ========================================


// Importar Express
const express =
    require("express");


// Crear Router
const router =
    express.Router();


// Importar controlador
const taskController =
    require("../controllers/taskController");


// Importar middleware JWT
const {
    authenticateToken
} =
    require("../middlewares/authMiddleware");


// ========================================
// CREAR TAREA
// POST /api/tasks
// ========================================

router.post(

    "/",

    taskController.createTask

);


// ========================================
// OBTENER TODAS LAS TAREAS
// GET /api/tasks
// RUTA PROTEGIDA
// ========================================

router.get(

    "/",

    authenticateToken,

    taskController.getTasks

);


// ========================================
// OBTENER TAREA POR ID
// GET /api/tasks/:id
// ========================================

router.get(

    "/:id",

    taskController.getTaskById

);


// ========================================
// ACTUALIZAR TAREA
// PUT /api/tasks/:id
// ========================================

router.put(

    "/:id",

    taskController.updateTask

);


// ========================================
// ELIMINAR TAREA
// DELETE /api/tasks/:id
// ========================================

router.delete(

    "/:id",

    taskController.deleteTask

);


// ========================================
// EXPORTAR ROUTER
// ========================================

module.exports = router;