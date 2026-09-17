// ========================================
// MODELO TASK
// ========================================

const { DataTypes } =
    require("sequelize");

const sequelize =
    require("../config/database");


// ========================================
// DEFINICIÓN DEL MODELO
// ========================================

const Task = sequelize.define(
    "Task",
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
        // TÍTULO
        // ====================================

        title: {

            type:
                DataTypes.STRING(150),

            allowNull:
                false,

            validate: {

                notEmpty: {
                    msg:
                        "El título es obligatorio"
                },

                len: {
                    args: [3, 150],

                    msg:
                        "El título debe contener entre 3 y 150 caracteres"
                }

            }

        },


        // ====================================
        // DESCRIPCIÓN
        // ====================================

        description: {

            type:
                DataTypes.TEXT,

            allowNull:
                true

        },


        // ====================================
        // ESTADO
        // ====================================

        completed: {

            type:
                DataTypes.BOOLEAN,

            allowNull:
                false,

            defaultValue:
                false

        }

    },

    {

        tableName:
            "tasks",

        timestamps:
            true,

        underscored:
            true

    }
);


// ========================================
// EXPORTAR MODELO
// ========================================

module.exports = Task;