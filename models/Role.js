// ========================================
// MODELO ROLE
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

const Role = sequelize.define(

    "Role",

    {

        // ====================================
        // ID
        // ====================================

        id: {

            type:
                DataTypes.INTEGER,

            primaryKey:
                true,

            autoIncrement:
                true

        },


        // ====================================
        // NOMBRE DEL ROL
        // ====================================

        name: {

            type:
                DataTypes.STRING(50),

            allowNull:
                false,

            unique:
                true,

            validate: {

                notEmpty: {

                    msg:
                        "El nombre del rol es obligatorio"

                }

            }

        },


        // ====================================
        // DESCRIPCIÓN
        // ====================================

        description: {

            type:
                DataTypes.STRING(200),

            allowNull:
                true

        }

    },

    {

        tableName:
            "roles",

        timestamps:
            true,

        underscored:
            true

    }

);


// ========================================
// EXPORTAR MODELO
// ========================================

module.exports = Role;