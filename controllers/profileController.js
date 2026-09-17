// ========================================
// CONTROLADOR DE PERFILES
// ========================================

const {
    Profile,
    User
} = require("../models");


// ========================================
// CREAR PERFIL
// POST /api/profiles
// ========================================

const createProfile = async (req, res) => {

    try {

        const {
            bio,
            phone,
            city,
            userId
        } = req.body;


        // Comprobar que el usuario exista.
        const user =
            await User.findByPk(userId);


        if (!user) {

            return res.status(404).json({

                status: "error",

                message:
                    "El usuario asociado no existe",

                data: null

            });

        }


        // Comprobar si ya posee perfil.
        const existingProfile =
            await Profile.findOne({

                where: {
                    userId
                }

            });


        if (existingProfile) {

            return res.status(409).json({

                status: "error",

                message:
                    "El usuario ya posee un perfil",

                data: null

            });

        }


        const profile =
            await Profile.create({

                bio,
                phone,
                city,
                userId

            });


        return res.status(201).json({

            status: "success",

            message:
                "Perfil creado correctamente",

            data: profile

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status: "error",

            message:
                "Error interno al crear el perfil",

            data: null

        });

    }

};


// ========================================
// OBTENER PERFIL POR USUARIO
// GET /api/profiles/user/:userId
// ========================================

const getProfileByUser = async (
    req,
    res
) => {

    try {

        const {
            userId
        } = req.params;


        const profile =
            await Profile.findOne({

                where: {
                    userId
                },

                include: [

                    {
                        model:
                            User,

                        as:
                            "user",

                        attributes: [
                            "id",
                            "name",
                            "email"
                        ]
                    }

                ]

            });


        if (!profile) {

            return res.status(404).json({

                status: "error",

                message:
                    "Perfil no encontrado",

                data: null

            });

        }


        return res.status(200).json({

            status: "success",

            message:
                "Perfil obtenido correctamente",

            data: profile

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status: "error",

            message:
                "Error interno al obtener el perfil",

            data: null

        });

    }

};


// ========================================
// ACTUALIZAR PERFIL
// PUT /api/profiles/:id
// ========================================

const updateProfile = async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;


        const profile =
            await Profile.findByPk(id);


        if (!profile) {

            return res.status(404).json({

                status: "error",

                message:
                    "Perfil no encontrado",

                data: null

            });

        }


        const {
            bio,
            phone,
            city
        } = req.body;


        await profile.update({

            bio:
                bio ?? profile.bio,

            phone:
                phone ?? profile.phone,

            city:
                city ?? profile.city

        });


        return res.status(200).json({

            status: "success",

            message:
                "Perfil actualizado correctamente",

            data: profile

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status: "error",

            message:
                "Error interno al actualizar el perfil",

            data: null

        });

    }

};


// ========================================
// ELIMINAR PERFIL
// DELETE /api/profiles/:id
// ========================================

const deleteProfile = async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;


        const profile =
            await Profile.findByPk(id);


        if (!profile) {

            return res.status(404).json({

                status: "error",

                message:
                    "Perfil no encontrado",

                data: null

            });

        }


        await profile.destroy();


        return res.status(200).json({

            status: "success",

            message:
                "Perfil eliminado correctamente",

            data: null

        });

    }
    catch (error) {

        console.error(error);


        return res.status(500).json({

            status: "error",

            message:
                "Error interno al eliminar el perfil",

            data: null

        });

    }

};


// ========================================
// EXPORTAR CONTROLADORES
// ========================================

module.exports = {

    createProfile,
    getProfileByUser,
    updateProfile,
    deleteProfile

};