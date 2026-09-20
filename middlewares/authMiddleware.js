// ========================================
// MIDDLEWARE DE AUTENTICACIÓN JWT
// ========================================


// Importar JWT
const jwt =
    require("jsonwebtoken");


// ========================================
// VERIFICAR TOKEN
// ========================================

const authenticateToken =
    (req, res, next) => {

        // ====================================
        // OBTENER AUTHORIZATION HEADER
        // ====================================

        const authHeader =
            req.headers.authorization;


        // Formato esperado:
        //
        // Authorization: Bearer TOKEN

        if (!authHeader) {

            return res.status(401).json({

                status:
                    "error",

                message:
                    "Token de autenticación requerido",

                data:
                    null

            });

        }


        // ====================================
        // SEPARAR "Bearer" Y TOKEN
        // ====================================

        const parts =
            authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({

                status:
                    "error",

                message:
                    "Formato de token inválido",

                data:
                    null

            });

        }


        const token =
            parts[1];


        // ====================================
        // COMPROBAR CONFIGURACIÓN
        // ====================================

        if (!process.env.JWT_SECRET) {

            return res.status(500).json({

                status:
                    "error",

                message:
                    "Configuración JWT no disponible",

                data:
                    null

            });

        }


        // ====================================
        // VERIFICAR TOKEN
        // ====================================

        try {

            const decoded =
                jwt.verify(

                    token,

                    process.env.JWT_SECRET

                );


            // Guardar información del token
            // para utilizarla en la ruta.
            req.user =
                decoded;


            next();

        }
        catch (error) {

            // ====================================
            // TOKEN EXPIRADO
            // ====================================

            if (
                error.name ===
                "TokenExpiredError"
            ) {

                return res.status(401).json({

                    status:
                        "error",

                    message:
                        "El token ha expirado",

                    data:
                        null

                });

            }


            // ====================================
            // TOKEN INVÁLIDO
            // ====================================

            return res.status(401).json({

                status:
                    "error",

                message:
                    "Token inválido",

                data:
                    null

            });

        }

    };


// ========================================
// EXPORTAR MIDDLEWARE
// ========================================

module.exports = {

    authenticateToken

};