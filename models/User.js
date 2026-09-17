// ========================================
// MODELO USER
// ========================================

// Importamos DataTypes desde Sequelize.
// DataTypes permite definir el tipo de
// cada columna de nuestra tabla.
const { DataTypes } = require("sequelize");


// Importamos la conexión a PostgreSQL.
const sequelize =
    require("../config/database");


// ========================================
// DEFINICIÓN DEL MODELO
// ========================================

const User = sequelize.define(
    "User",
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
        // NOMBRE
        // ====================================

        name: {

            type:
                DataTypes.STRING(100),

            allowNull:
                false,

            validate: {

                notEmpty: {
                    msg:
                        "El nombre es obligatorio"
                },

                len: {
                    args: [2, 100],

                    msg:
                        "El nombre debe contener entre 2 y 100 caracteres"
                }

            }

        },


        // ====================================
        // EMAIL
        // ====================================

        email: {

            type:
                DataTypes.STRING(150),

            allowNull:
                false,

            unique:
                true,

            validate: {

                notEmpty: {
                    msg:
                        "El correo electrónico es obligatorio"
                },

                isEmail: {
                    msg:
                        "Debe ingresar un correo electrónico válido"
                }

            }

        },


        // ====================================
        // ESTADO
        // ====================================

        active: {

            type:
                DataTypes.BOOLEAN,

            allowNull:
                false,

            defaultValue:
                true

        }

    },

    {

        // Nombre físico de la tabla
        // dentro de PostgreSQL.
        tableName:
            "users",


        // Sequelize creará automáticamente:
        //
        // created_at
        // updated_at
        timestamps:
            true,


        // Convierte createdAt en created_at
        // y updatedAt en updated_at.
        underscored:
            true

    }
);


// ========================================
// EXPORTAR MODELO
// ========================================

module.exports = User;