// ========================================
// RUTAS DE TAREAS
// ========================================


// Importar Express
const express =
    require("express");


// Crear Router
const router =
    express.Router();


// Importar controlador de tareas
const taskController =
    require("../controllers/taskController");


// ========================================
// CRUD DE TAREAS
// ========================================


// Crear tarea
// POST /api/tasks
router.post(
    "/",
    taskController.createTask
);


// Obtener todas las tareas
// GET /api/tasks
router.get(
    "/",
    taskController.getTasks
);


// Obtener una tarea por ID
// GET /api/tasks/:id
router.get(
    "/:id",
    taskController.getTaskById
);


// Actualizar tarea
// PUT /api/tasks/:id
router.put(
    "/:id",
    taskController.updateTask
);


// Eliminar tarea
// DELETE /api/tasks/:id
router.delete(
    "/:id",
    taskController.deleteTask
);


// ========================================
// EXPORTAR ROUTER
// ========================================

module.exports = router;