// ========================================
// CONTROLADOR DE AUTENTICACIÓN
// ========================================


// Importar bcrypt
const bcrypt =
    require("bcryptjs");


// Importar JSON Web Token
const jwt =
    require("jsonwebtoken");


// Importar modelo User
const {
    User
} = require("../models");


// ========================================
// REGISTRAR USUARIO
// POST /api/auth/register
// ========================================

const register =
    async (req, res) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;


            // ====================================
            // VALIDAR CAMPOS OBLIGATORIOS
            // ====================================

            if (
                !name ||
                !email ||
                !password
            ) {

                return res.status(400).json({

                    status:
                        "error",

                    message:
                        "Nombre, correo y contraseña son obligatorios",

                    data:
                        null

                });

            }


            // ====================================
            // VALIDAR CONTRASEÑA
            // ====================================

            if (password.length < 8) {

                return res.status(400).json({

                    status:
                        "error",

                    message:
                        "La contraseña debe contener al menos 8 caracteres",

                    data:
                        null

                });

            }


            // ====================================
            // NORMALIZAR EMAIL
            // ====================================

            const normalizedEmail =
                email
                    .trim()
                    .toLowerCase();


            // ====================================
            // COMPROBAR EMAIL DUPLICADO
            // ====================================

            const existingUser =
                await User.findOne({

                    where: {

                        email:
                            normalizedEmail

                    }

                });


            if (existingUser) {

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
            // CIFRAR CONTRASEÑA
            // ====================================

            const passwordHash =
                await bcrypt.hash(

                    password,

                    10

                );


            // ====================================
            // CREAR USUARIO
            // ====================================

            const user =
                await User.create({

                    name:
                        name.trim(),

                    email:
                        normalizedEmail,

                    active:
                        true,

                    passwordHash

                });


            // ====================================
            // DATOS SEGUROS PARA RESPUESTA
            // ====================================

            const safeUser = {

                id:
                    user.id,

                name:
                    user.name,

                email:
                    user.email,

                active:
                    user.active

            };


            return res.status(201).json({

                status:
                    "success",

                message:
                    "Usuario registrado correctamente",

                data:
                    safeUser

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
            // VALIDACIÓN SEQUELIZE
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
                    "Error interno durante el registro",

                data:
                    null

            });

        }

    };


// ========================================
// LOGIN
// POST /api/auth/login
// ========================================

const login =
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;


            // ====================================
            // VALIDAR CAMPOS
            // ====================================

            if (
                !email ||
                !password
            ) {

                return res.status(400).json({

                    status:
                        "error",

                    message:
                        "Correo y contraseña son obligatorios",

                    data:
                        null

                });

            }


            const normalizedEmail =
                email
                    .trim()
                    .toLowerCase();


            // ====================================
            // BUSCAR USUARIO CON CONTRASEÑA
            // ====================================

            const user =
                await User
                    .scope("withPassword")
                    .findOne({

                        where: {

                            email:
                                normalizedEmail

                        }

                    });


            // ====================================
            // USUARIO NO EXISTE
            // ====================================

            if (!user) {

                return res.status(401).json({

                    status:
                        "error",

                    message:
                        "Credenciales inválidas",

                    data:
                        null

                });

            }


            // ====================================
            // USUARIO ANTIGUO SIN PASSWORD
            // ====================================

            if (!user.passwordHash) {

                return res.status(401).json({

                    status:
                        "error",

                    message:
                        "Este usuario no posee credenciales de acceso",

                    data:
                        null

                });

            }


            // ====================================
            // VALIDAR CONTRASEÑA
            // ====================================

            const validPassword =
                await bcrypt.compare(

                    password,

                    user.passwordHash

                );


            if (!validPassword) {

                return res.status(401).json({

                    status:
                        "error",

                    message:
                        "Credenciales inválidas",

                    data:
                        null

                });

            }


            // ====================================
            // VALIDAR USUARIO ACTIVO
            // ====================================

            if (!user.active) {

                return res.status(403).json({

                    status:
                        "error",

                    message:
                        "El usuario se encuentra inactivo",

                    data:
                        null

                });

            }


            // ====================================
            // COMPROBAR JWT_SECRET
            // ====================================

            if (!process.env.JWT_SECRET) {

                throw new Error(
                    "JWT_SECRET no está configurado"
                );

            }


            // ====================================
            // GENERAR TOKEN
            // ====================================

            const token =
                jwt.sign(

                    {

                        id:
                            user.id,

                        email:
                            user.email

                    },

                    process.env.JWT_SECRET,

                    {

                        expiresIn:
                            process.env.JWT_EXPIRES_IN ||
                            "1h"

                    }

                );


            // ====================================
            // RESPUESTA
            // ====================================

            return res.status(200).json({

                status:
                    "success",

                message:
                    "Inicio de sesión correcto",

                data: {

                    user: {

                        id:
                            user.id,

                        name:
                            user.name,

                        email:
                            user.email,

                        active:
                            user.active

                    },

                    token

                }

            });

        }
        catch (error) {

            console.error(error);


            return res.status(500).json({

                status:
                    "error",

                message:
                    "Error interno durante el inicio de sesión",

                data:
                    null

            });

        }

    };


// ========================================
// EXPORTAR CONTROLADORES
// ========================================

module.exports = {

    register,
    login

};