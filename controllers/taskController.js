// ========================================
// CONTROLADOR DE TAREAS
// ========================================


// Importar modelos
const {
    Task,
    User
} = require("../models");


// Importar operadores de Sequelize
const { Op } =
    require("sequelize");


// ========================================
// CREAR TAREA
// POST /api/tasks
// ========================================

const createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            completed,
            userId
        } = req.body;


        // Comprobar que el usuario exista
        const user =
            await User.findByPk(userId);


        if (!user) {

            return res.status(404).json({

                status: "error",

                message:
                    "El usuario asociado no existe",

                data: null

            });

        }


        // Crear tarea
        const task =
            await Task.create({

                title,
                description,
                completed,
                userId

            });


        return res.status(201).json({

            status: "success",

            message:
                "Tarea creada correctamente",

            data: task

        });

    }
    catch (error) {

        if (
            error.name ===
            "SequelizeValidationError"
        ) {

            return res.status(400).json({

                status: "error",

                message:
                    error.errors[0].message,

                data: null

            });

        }


        console.error(error);


        return res.status(500).json({

            status: "error",

            message:
                "Error interno al crear la tarea",

            data: null

        });

    }

};


// ========================================
// OBTENER TODAS LAS TAREAS
// GET /api/tasks
//
// Filtros disponibles:
//
// ?search=texto
// ?completed=true
// ?userId=1
//
// También pueden combinarse.
// ========================================

const getTasks = async (req, res) => {

    try {

        const {
            search,
            completed,
            userId
        } = req.query;


        // Objeto de condiciones
        const where = {};


        // ====================================
        // BÚSQUEDA POR TÍTULO O DESCRIPCIÓN
        // ====================================

        if (search) {

            where[Op.or] = [

                {
                    title: {
                        [Op.iLike]:
                            `%${search}%`
                    }
                },

                {
                    description: {
                        [Op.iLike]:
                            `%${search}%`
                    }
                }

            ];

        }


        // ====================================
        // FILTRO POR ESTADO
        // ====================================

        if (
            completed === "true" ||
            completed === "false"
        ) {

            where.completed =
                completed === "true";

        }


        // ====================================
        // FILTRO POR USUARIO
        // ====================================

        if (userId) {

            where.userId =
                Number(userId);

        }


        // ====================================
        // CONSULTA CON RELACIÓN USER
        // ====================================

        const tasks =
            await Task.findAll({

                where,

                include: [

                    {
                        model: User,

                        as: "user",

                        attributes: [
                            "id",
                            "name",
                            "email"
                        ]
                    }

                ],

                order: [
                    ["id", "ASC"]
                ]

            });


        return res.status(200).json({

            status: "success",

            message:
                "Tareas obtenidas correctamente",

            data: tasks

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status: "error",

            message:
                "Error interno al obtener las tareas",

            data: null

        });

    }

};


// ========================================
// OBTENER TAREA POR ID
// GET /api/tasks/:id
// ========================================

const getTaskById = async (req, res) => {

    try {

        const { id } =
            req.params;


        const task =
            await Task.findByPk(
                id,
                {
                    include: [

                        {
                            model: User,

                            as: "user",

                            attributes: [
                                "id",
                                "name",
                                "email"
                            ]
                        }

                    ]
                }
            );


        if (!task) {

            return res.status(404).json({

                status: "error",

                message:
                    "Tarea no encontrada",

                data: null

            });

        }


        return res.status(200).json({

            status: "success",

            message:
                "Tarea obtenida correctamente",

            data: task

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status: "error",

            message:
                "Error interno al obtener la tarea",

            data: null

        });

    }

};


// ========================================
// ACTUALIZAR TAREA
// PUT /api/tasks/:id
// ========================================

const updateTask = async (req, res) => {

    try {

        const { id } =
            req.params;


        const task =
            await Task.findByPk(id);


        if (!task) {

            return res.status(404).json({

                status: "error",

                message:
                    "Tarea no encontrada",

                data: null

            });

        }


        const {
            title,
            description,
            completed
        } = req.body;


        await task.update({

            title:
                title ?? task.title,

            description:
                description ??
                task.description,

            completed:
                completed ??
                task.completed

        });


        return res.status(200).json({

            status: "success",

            message:
                "Tarea actualizada correctamente",

            data: task

        });

    }
    catch (error) {

        if (
            error.name ===
            "SequelizeValidationError"
        ) {

            return res.status(400).json({

                status: "error",

                message:
                    error.errors[0].message,

                data: null

            });

        }


        console.error(error);


        return res.status(500).json({

            status: "error",

            message:
                "Error interno al actualizar la tarea",

            data: null

        });

    }

};


// ========================================
// ELIMINAR TAREA
// DELETE /api/tasks/:id
// ========================================

const deleteTask = async (req, res) => {

    try {

        const { id } =
            req.params;


        const task =
            await Task.findByPk(id);


        if (!task) {

            return res.status(404).json({

                status: "error",

                message:
                    "Tarea no encontrada",

                data: null

            });

        }


        await task.destroy();


        return res.status(200).json({

            status: "success",

            message:
                "Tarea eliminada correctamente",

            data: null

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status: "error",

            message:
                "Error interno al eliminar la tarea",

            data: null

        });

    }

};


// ========================================
// EXPORTAR CONTROLADORES
// ========================================

module.exports = {

    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask

};