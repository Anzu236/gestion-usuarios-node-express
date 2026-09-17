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
// IMPORTAR MODELOS Y RELACIONES
// ========================================

require("./models");


// ========================================
// IMPORTAR RUTAS
// ========================================

const indexRoutes =
    require("./routes/indexRoutes");


const userRoutes =
    require("./routes/userRoutes");


const taskRoutes =
    require("./routes/taskRoutes");


const profileRoutes =
    require("./routes/profileRoutes");


const roleRoutes =
    require("./routes/roleRoutes");


// ========================================
// CREAR APLICACIÓN
// ========================================

const app =
    express();


const PORT =
    process.env.PORT || 3000;


// ========================================
// MIDDLEWARES
// ========================================

app.use(

    express.json()

);


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
// RUTAS PRINCIPALES
// ========================================

app.use(

    "/",

    indexRoutes

);


// ========================================
// API USUARIOS
// ========================================

app.use(

    "/api/users",

    userRoutes

);


// ========================================
// API TAREAS
// ========================================

app.use(

    "/api/tasks",

    taskRoutes

);


// ========================================
// API PERFILES
// ========================================

app.use(

    "/api/profiles",

    profileRoutes

);


// ========================================
// API ROLES
// ========================================

app.use(

    "/api/roles",

    roleRoutes

);


// ========================================
// RUTA 404
// ========================================

app.use(

    (req, res) => {

        res.status(404).json({

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

const startServer = async () => {

    try {

        // Comprobar conexión
        await sequelize.authenticate();


        console.log(

            "Conexión a PostgreSQL establecida correctamente."

        );


        // Sincronizar modelos
        await sequelize.sync();


        console.log(

            "Modelos sincronizados con PostgreSQL."

        );


        // Iniciar servidor
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