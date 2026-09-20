// ========================================
// CONTROLADOR DE USUARIOS
// ========================================


// Importar modelo User
const {
    User
} = require("../models");


// Importar operadores Sequelize
const {
    Op
} = require("sequelize");


// Importar servicio transaccional
const {
    createUserWithTask:
        createUserWithTaskService
} =
    require(
        "../services/userTransactionService"
    );


// ========================================
// CREAR USUARIO
// POST /api/users
// ========================================

const createUser = async (req, res) => {

    try {

        const {
            name,
            email,
            active
        } = req.body;


        const user =
            await User.create({

                name,
                email,
                active

            });


        return res.status(201).json({

            status:
                "success",

            message:
                "Usuario creado correctamente",

            data:
                user

        });

    }
    catch (error) {

        // ====================================
        // EMAIL DUPLICADO
        // ====================================

        if (
            error.name ===
            "SequelizeUniqueConstraintError"
        ) {

            return res.status(409).json({

                status:
                    "error",

                message:
                    "El correo electrónico ya está registrado",

                data:
                    null

            });

        }


        // ====================================
        // ERROR DE VALIDACIÓN
        // ====================================

        if (
            error.name ===
            "SequelizeValidationError"
        ) {

            return res.status(400).json({

                status:
                    "error",

                message:
                    error.errors[0].message,

                data:
                    null

            });

        }


        console.error(error);


        return res.status(500).json({

            status:
                "error",

            message:
                "Error interno al crear el usuario",

            data:
                null

        });

    }

};


// ========================================
// CREAR USUARIO + TAREA
// CON TRANSACCIÓN
// POST /api/users/transaction
// ========================================

const createUserWithTask =
    async (req, res) => {

        try {

            const {
                name,
                email,
                active,
                title,
                description
            } = req.body;


            const result =
                await createUserWithTaskService({

                    name,
                    email,
                    active,
                    title,
                    description

                });


            return res.status(201).json({

                status:
                    "success",

                message:
                    "Transacción completada correctamente",

                data:
                    result

            });

        }
        catch (error) {

            // ====================================
            // EMAIL DUPLICADO
            // ====================================

            if (
                error.name ===
                "SequelizeUniqueConstraintError"
            ) {

                return res.status(409).json({

                    status:
                        "error",

                    message:
                        "La transacción fue revertida. El correo ya existe.",

                    data:
                        null

                });

            }


            // ====================================
            // VALIDACIÓN
            // ====================================

            if (
                error.name ===
                "SequelizeValidationError"
            ) {

                return res.status(400).json({

                    status:
                        "error",

                    message:
                        "La transacción fue revertida: " +
                        error.errors[0].message,

                    data:
                        null

                });

            }


            console.error(error);


            return res.status(500).json({

                status:
                    "error",

                message:
                    "La transacción fue revertida por un error interno",

                data:
                    null

            });

        }

    };


// ========================================
// OBTENER USUARIOS
// GET /api/users
//
// FILTROS:
// ?search=texto
// ?active=true
// ========================================

const getUsers = async (req, res) => {

    try {

        const {
            search,
            active
        } = req.query;


        const where = {};


        // ====================================
        // BÚSQUEDA POR NOMBRE O EMAIL
        // ====================================

        if (search) {

            where[Op.or] = [

                {
                    name: {

                        [Op.iLike]:
                            `%${search}%`

                    }
                },

                {
                    email: {

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
            active === "true" ||
            active === "false"
        ) {

            where.active =
                active === "true";

        }


        const users =
            await User.findAll({

                where,

                order: [

                    [
                        "id",
                        "ASC"
                    ]

                ]

            });


        return res.status(200).json({

            status:
                "success",

            message:
                "Usuarios obtenidos correctamente",

            data:
                users

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status:
                "error",

            message:
                "Error interno al obtener los usuarios",

            data:
                null

        });

    }

};


// ========================================
// OBTENER USUARIO POR ID
// GET /api/users/:id
// ========================================

const getUserById =
    async (req, res) => {

        try {

            const {
                id
            } = req.params;


            const user =
                await User.findByPk(id);


            if (!user) {

                return res.status(404).json({

                    status:
                        "error",

                    message:
                        "Usuario no encontrado",

                    data:
                        null

                });

            }


            return res.status(200).json({

                status:
                    "success",

                message:
                    "Usuario obtenido correctamente",

                data:
                    user

            });

        }
        catch (error) {

            console.error(error);


            return res.status(500).json({

                status:
                    "error",

                message:
                    "Error interno al obtener el usuario",

                data:
                    null

            });

        }

    };


// ========================================
// ACTUALIZAR USUARIO
// PUT /api/users/:id
// ========================================

const updateUser =
    async (req, res) => {

        try {

            const {
                id
            } = req.params;


            const user =
                await User.findByPk(id);


            if (!user) {

                return res.status(404).json({

                    status:
                        "error",

                    message:
                        "Usuario no encontrado",

                    data:
                        null

                });

            }


            const {
                name,
                email,
                active
            } = req.body;


            await user.update({

                name:
                    name ?? user.name,

                email:
                    email ?? user.email,

                active:
                    active ?? user.active

            });


            return res.status(200).json({

                status:
                    "success",

                message:
                    "Usuario actualizado correctamente",

                data:
                    user

            });

        }
        catch (error) {

            if (
                error.name ===
                "SequelizeUniqueConstraintError"
            ) {

                return res.status(409).json({

                    status:
                        "error",

                    message:
                        "El correo electrónico ya está registrado",

                    data:
                        null

                });

            }


            if (
                error.name ===
                "SequelizeValidationError"
            ) {

                return res.status(400).json({

                    status:
                        "error",

                    message:
                        error.errors[0].message,

                    data:
                        null

                });

            }


            console.error(error);


            return res.status(500).json({

                status:
                    "error",

                message:
                    "Error interno al actualizar el usuario",

                data:
                    null

            });

        }

    };


// ========================================
// ELIMINAR USUARIO
// DELETE /api/users/:id
// ========================================

const deleteUser =
    async (req, res) => {

        try {

            const {
                id
            } = req.params;


            const user =
                await User.findByPk(id);


            if (!user) {

                return res.status(404).json({

                    status:
                        "error",

                    message:
                        "Usuario no encontrado",

                    data:
                        null

                });

            }


            await user.destroy();


            return res.status(200).json({

                status:
                    "success",

                message:
                    "Usuario eliminado correctamente",

                data:
                    null

            });

        }
        catch (error) {

            console.error(error);


            return res.status(500).json({

                status:
                    "error",

                message:
                    "Error interno al eliminar el usuario",

                data:
                    null

            });

        }

    };


// ========================================
// EXPORTAR CONTROLADORES
// ========================================

module.exports = {

    createUser,
    createUserWithTask,
    getUsers,
    getUserById,
    updateUser,
    deleteUser

};