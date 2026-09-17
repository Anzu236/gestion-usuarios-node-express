// ========================================
// MODELO PROFILE
// ========================================

const { DataTypes } =
    require("sequelize");

const sequelize =
    require("../config/database");


// ========================================
// DEFINICIÓN DEL MODELO
// ========================================

const Profile = sequelize.define(
    "Profile",
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
        // BIOGRAFÍA
        // ====================================

        bio: {

            type:
                DataTypes.TEXT,

            allowNull:
                true

        },


        // ====================================
        // TELÉFONO
        // ====================================

        phone: {

            type:
                DataTypes.STRING(30),

            allowNull:
                true

        },


        // ====================================
        // CIUDAD
        // ====================================

        city: {

            type:
                DataTypes.STRING(100),

            allowNull:
                true

        },


        // ====================================
        // USUARIO ASOCIADO
        // ====================================

        userId: {

            type:
                DataTypes.INTEGER,

            allowNull:
                false,

            unique:
                true,

            field:
                "user_id"

        }

    },

    {

        tableName:
            "profiles",

        timestamps:
            true,

        underscored:
            true

    }
);


// ========================================
// EXPORTAR MODELO
// ========================================

module.exports = Profile;