// ========================================
// MODELO USER
// ========================================


// Importar DataTypes
const {
    DataTypes
} = require("sequelize");


// Importar conexión con PostgreSQL
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

                    args:
                        [3, 100],

                    msg:
                        "El nombre debe contener entre 3 y 100 caracteres"

                }

            }

        },


        // ====================================
        // CORREO ELECTRÓNICO
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
        // ESTADO DEL USUARIO
        // ====================================

        active: {

            type:
                DataTypes.BOOLEAN,

            allowNull:
                false,

            defaultValue:
                true

        },


        // ====================================
        // CONTRASEÑA CIFRADA
        // ====================================

        passwordHash: {

            type:
                DataTypes.STRING(255),

            allowNull:
                true,

            field:
                "password_hash"

        }

    },

    {

        tableName:
            "users",

        timestamps:
            true,

        underscored:
            true,


        // ====================================
        // SCOPE POR DEFECTO
        // ====================================
        //
        // Evita que passwordHash aparezca
        // normalmente en consultas y respuestas.

        defaultScope: {

            attributes: {

                exclude: [
                    "passwordHash"
                ]

            }

        },


        // ====================================
        // SCOPE PARA LOGIN
        // ====================================
        //
        // Se utilizará solamente cuando
        // necesitemos verificar la contraseña.

        scopes: {

            withPassword: {

                attributes: {

                    include: [
                        "passwordHash"
                    ]

                }

            }

        }

    }

);


// ========================================
// EXPORTAR MODELO
// ========================================

module.exports = User;