// ========================================
// CONFIGURACIÓN DE BASE DE DATOS
// ========================================

// Importamos Sequelize desde el paquete
// instalado mediante npm.
const { Sequelize } = require("sequelize");


// ========================================
// CREAR CONEXIÓN
// ========================================

// Creamos una instancia de Sequelize.
//
// Los datos de conexión se obtienen desde
// las variables almacenadas en .env.

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,

        port:
            Number(process.env.DB_PORT) || 5432,

        dialect: "postgres",

        // Evitamos mostrar automáticamente
        // todas las consultas SQL en consola.
        logging: false
    }
);


// ========================================
// EXPORTAR CONEXIÓN
// ========================================

module.exports = sequelize;