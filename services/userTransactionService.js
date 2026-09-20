// ========================================
// SERVICIO DE TRANSACCIONES DE USUARIO
// ========================================


// Importar conexión de Sequelize
const sequelize =
    require("../config/database");


// Importar modelos
const {
    User,
    Task
} = require("../models");


// ========================================
// CREAR USUARIO + TAREA
// EN UNA TRANSACCIÓN
// ========================================

const createUserWithTask =
    async (data) => {

        // Iniciar transacción
        const transaction =
            await sequelize.transaction();


        try {

            // ====================================
            // ACCIÓN 1
            // CREAR USUARIO
            // ====================================

            const user =
                await User.create(
                    {
                        name:
                            data.name,

                        email:
                            data.email,

                        active:
                            data.active ?? true
                    },
                    {
                        transaction
                    }
                );


            // ====================================
            // ACCIÓN 2
            // CREAR TAREA INICIAL
            // ====================================

            const task =
                await Task.create(
                    {
                        title:
                            data.title,

                        description:
                            data.description,

                        completed:
                            false,

                        userId:
                            user.id
                    },
                    {
                        transaction
                    }
                );


            // ====================================
            // CONFIRMAR TRANSACCIÓN
            // ====================================

            await transaction.commit();


            console.log(
                "[TRANSACCIÓN] Usuario y tarea creados correctamente."
            );


            return {
                user,
                task
            };

        }
        catch (error) {

            // ====================================
            // REVERTIR TRANSACCIÓN
            // ====================================

            await transaction.rollback();


            console.error(
                "[TRANSACCIÓN] Error. Se ejecutó ROLLBACK."
            );


            console.error(
                error.message
            );


            throw error;

        }

    };


// ========================================
// EXPORTAR SERVICIO
// ========================================

module.exports = {

    createUserWithTask

};