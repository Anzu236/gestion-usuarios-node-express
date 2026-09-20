// ========================================
// ARCHIVO PRINCIPAL DE LA APLICACIÓN
// ========================================


// ========================================
// VARIABLES DE ENTORNO
// ========================================

require("dotenv").config();


// ========================================
// IMPORTACIONES
// ========================================

const express =
    require("express");


const path =
    require("path");


const sequelize =
    require("./config/database");


// ========================================
// MODELOS Y RELACIONES
// ========================================

require("./models");


// ========================================
// IMPORTAR RUTAS
// ========================================

const indexRoutes =
    require("./routes/indexRoutes");


const authRoutes =
    require("./routes/authRoutes");


const userRoutes =
    require("./routes/userRoutes");


const taskRoutes =
    require("./routes/taskRoutes");


const profileRoutes =
    require("./routes/profileRoutes");


const roleRoutes =
    require("./routes/roleRoutes");


const uploadRoutes =
    require("./routes/uploadRoutes");


// ========================================
// CREAR APLICACIÓN
// ========================================

const app =
    express();


const PORT =
    process.env.PORT || 3000;


// ========================================
// MIDDLEWARES GENERALES
// ========================================


// JSON
app.use(
    express.json()
);


// Formularios
app.use(
    express.urlencoded({

        extended:
            true

    })
);


// ========================================
// ARCHIVOS ESTÁTICOS
// ========================================

app.use(

    express.static(

        path.join(
            __dirname,
            "public"
        )

    )

);


// ========================================
// AUTENTICACIÓN
// ========================================


// API principal
//
// POST /api/auth/register
// POST /api/auth/login

app.use(

    "/api/auth",

    authRoutes

);


// Alias solicitado por la consigna:
//
// POST /login
//
// También queda disponible:
//
// POST /register

app.use(

    "/",

    authRoutes

);


// ========================================
// RUTAS GENERALES
// ========================================

app.use(

    "/",

    indexRoutes

);


// ========================================
// USUARIOS
// ========================================

app.use(

    "/api/users",

    userRoutes

);


// ========================================
// TAREAS
// ========================================

app.use(

    "/api/tasks",

    taskRoutes

);


// ========================================
// PERFILES
// ========================================

app.use(

    "/api/profiles",

    profileRoutes

);


// ========================================
// ROLES
// ========================================

app.use(

    "/api/roles",

    roleRoutes

);


// ========================================
// SUBIDA DE ARCHIVOS
// ========================================

app.use(

    "/upload",

    uploadRoutes

);


// ========================================
// RUTA NO ENCONTRADA
// ========================================

app.use(

    (req, res) => {

        res
            .status(404)
            .json({

                status:
                    "error",

                message:
                    "Ruta no encontrada",

                data:
                    null

            });

    }

);


// ========================================
// INICIAR SERVIDOR
// ========================================

const startServer =
    async () => {

        try {

            // ====================================
            // CONEXIÓN POSTGRESQL
            // ====================================

            await sequelize.authenticate();


            console.log(
                "Conexión a PostgreSQL establecida correctamente."
            );


            // ====================================
            // SINCRONIZAR MODELOS
            // ====================================

            await sequelize.sync();


            console.log(
                "Modelos sincronizados con PostgreSQL."
            );


            // ====================================
            // INICIAR EXPRESS
            // ====================================

            app.listen(

                PORT,

                () => {

                    console.log(
                        `Servidor iniciado en http://localhost:${PORT}`
                    );

                }

            );

        }
        catch (error) {

            console.error(
                "Error al iniciar la aplicación:"
            );


            console.error(
                error.message
            );


            process.exit(1);

        }

    };


// ========================================
// EJECUTAR APLICACIÓN
// ========================================

startServer();