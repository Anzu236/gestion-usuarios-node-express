// ========================================
// MODELOS Y RELACIONES
// ========================================


// ========================================
// IMPORTAR MODELOS
// ========================================

const User =
    require("./User");


const Task =
    require("./Task");


const Profile =
    require("./Profile");


const Role =
    require("./Role");


const UserRole =
    require("./UserRole");


// ========================================
// RELACIÓN USER 1:N TASK
// ========================================

User.hasMany(

    Task,

    {

        foreignKey: {

            name:
                "userId",

            field:
                "user_id",

            allowNull:
                false

        },

        as:
            "tasks",

        onDelete:
            "CASCADE"

    }

);


Task.belongsTo(

    User,

    {

        foreignKey: {

            name:
                "userId",

            field:
                "user_id",

            allowNull:
                false

        },

        as:
            "user"

    }

);


// ========================================
// RELACIÓN USER 1:1 PROFILE
// ========================================

User.hasOne(

    Profile,

    {

        foreignKey:
            "userId",

        as:
            "profile",

        onDelete:
            "CASCADE"

    }

);


Profile.belongsTo(

    User,

    {

        foreignKey:
            "userId",

        as:
            "user"

    }

);


// ========================================
// RELACIÓN USER N:M ROLE
// ========================================

// Un usuario puede tener varios roles.
User.belongsToMany(

    Role,

    {

        through:
            UserRole,

        foreignKey: {

            name:
                "userId",

            field:
                "user_id"

        },

        otherKey: {

            name:
                "roleId",

            field:
                "role_id"

        },

        as:
            "roles"

    }

);


// Un rol puede pertenecer
// a varios usuarios.
Role.belongsToMany(

    User,

    {

        through:
            UserRole,

        foreignKey: {

            name:
                "roleId",

            field:
                "role_id"

        },

        otherKey: {

            name:
                "userId",

            field:
                "user_id"

        },

        as:
            "users"

    }

);


// ========================================
// RELACIONES DE LA TABLA INTERMEDIA
// ========================================

UserRole.belongsTo(

    User,

    {

        foreignKey:
            "userId",

        as:
            "user"

    }

);


UserRole.belongsTo(

    Role,

    {

        foreignKey:
            "roleId",

        as:
            "role"

    }

);


// ========================================
// EXPORTAR MODELOS
// ========================================

module.exports = {

    User,
    Task,
    Profile,
    Role,
    UserRole

};