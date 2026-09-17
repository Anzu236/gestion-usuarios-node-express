// ========================================
// CONTROLADOR DE ROLES
// ========================================


// Importar modelos
const {

    User,
    Role

} = require("../models");


// ========================================
// CREAR ROL
// POST /api/roles
// ========================================

const createRole = async (req, res) => {

    try {

        const {

            name,
            description

        } = req.body;


        const role =
            await Role.create({

                name,
                description

            });


        return res.status(201).json({

            status:
                "success",

            message:
                "Rol creado correctamente",

            data:
                role

        });

    }
    catch (error) {

        // Rol duplicado
        if (
            error.name ===
            "SequelizeUniqueConstraintError"
        ) {

            return res.status(409).json({

                status:
                    "error",

                message:
                    "El rol ya existe",

                data:
                    null

            });

        }


        // Error de validación
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
                "Error interno al crear el rol",

            data:
                null

        });

    }

};


// ========================================
// OBTENER TODOS LOS ROLES
// GET /api/roles
// ========================================

const getRoles = async (req, res) => {

    try {

        const roles =
            await Role.findAll({

                include: [

                    {

                        model:
                            User,

                        as:
                            "users",

                        attributes: [

                            "id",
                            "name",
                            "email"

                        ],

                        through: {

                            attributes: []

                        }

                    }

                ],

                order: [

                    ["id", "ASC"]

                ]

            });


        return res.status(200).json({

            status:
                "success",

            message:
                "Roles obtenidos correctamente",

            data:
                roles

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status:
                "error",

            message:
                "Error interno al obtener los roles",

            data:
                null

        });

    }

};


// ========================================
// ASIGNAR ROL A USUARIO
// POST /api/roles/assign
// ========================================

const assignRole = async (req, res) => {

    try {

        const {

            userId,
            roleId

        } = req.body;


        // ====================================
        // BUSCAR USUARIO
        // ====================================

        const user =
            await User.findByPk(userId);


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


        // ====================================
        // BUSCAR ROL
        // ====================================

        const role =
            await Role.findByPk(roleId);


        if (!role) {

            return res.status(404).json({

                status:
                    "error",

                message:
                    "Rol no encontrado",

                data:
                    null

            });

        }


        // ====================================
        // COMPROBAR SI YA LO TIENE
        // ====================================

        const hasRole =
            await user.hasRole(role);


        if (hasRole) {

            return res.status(409).json({

                status:
                    "error",

                message:
                    "El usuario ya posee este rol",

                data:
                    null

            });

        }


        // ====================================
        // ASIGNAR ROL
        // ====================================

        await user.addRole(role);


        return res.status(200).json({

            status:
                "success",

            message:
                "Rol asignado correctamente",

            data: {

                userId:
                    user.id,

                roleId:
                    role.id,

                role:
                    role.name

            }

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status:
                "error",

            message:
                "Error interno al asignar el rol",

            data:
                null

        });

    }

};


// ========================================
// OBTENER ROLES DE UN USUARIO
// GET /api/roles/user/:userId
// ========================================

const getUserRoles = async (
    req,
    res
) => {

    try {

        const {

            userId

        } = req.params;


        const user =
            await User.findByPk(

                userId,

                {

                    attributes: [

                        "id",
                        "name",
                        "email"

                    ],

                    include: [

                        {

                            model:
                                Role,

                            as:
                                "roles",

                            through: {

                                attributes: []

                            }

                        }

                    ]

                }

            );


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
                "Roles del usuario obtenidos correctamente",

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
                "Error interno al obtener los roles del usuario",

            data:
                null

        });

    }

};


// ========================================
// QUITAR ROL A USUARIO
// DELETE /api/roles/:roleId/users/:userId
// ========================================

const removeRole = async (
    req,
    res
) => {

    try {

        const {

            roleId,
            userId

        } = req.params;


        const user =
            await User.findByPk(userId);


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


        const role =
            await Role.findByPk(roleId);


        if (!role) {

            return res.status(404).json({

                status:
                    "error",

                message:
                    "Rol no encontrado",

                data:
                    null

            });

        }


        const hasRole =
            await user.hasRole(role);


        if (!hasRole) {

            return res.status(404).json({

                status:
                    "error",

                message:
                    "El usuario no posee este rol",

                data:
                    null

            });

        }


        await user.removeRole(role);


        return res.status(200).json({

            status:
                "success",

            message:
                "Rol eliminado del usuario correctamente",

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
                "Error interno al eliminar el rol del usuario",

            data:
                null

        });

    }

};


// ========================================
// EXPORTAR CONTROLADORES
// ========================================

module.exports = {

    createRole,
    getRoles,
    assignRole,
    getUserRoles,
    removeRole

};