// ========================================
// MODELO INTERMEDIO USER ROLE
// ========================================


// Importar DataTypes
const { DataTypes } =
    require("sequelize");


// Importar conexión PostgreSQL
const sequelize =
    require("../config/database");


// ========================================
// DEFINICIÓN DEL MODELO
// ========================================

const UserRole = sequelize.define(

    "UserRole",

    {

        // ====================================
        // USUARIO
        // ====================================

        userId: {

            type:
                DataTypes.INTEGER,

            allowNull:
                false,

            primaryKey:
                true,

            field:
                "user_id"

        },


        // ====================================
        // ROL
        // ====================================

        roleId: {

            type:
                DataTypes.INTEGER,

            allowNull:
                false,

            primaryKey:
                true,

            field:
                "role_id"

        }

    },

    {

        tableName:
            "user_roles",

        timestamps:
            true,

        underscored:
            true

    }

);


// ========================================
// EXPORTAR MODELO
// ========================================

module.exports = UserRole;