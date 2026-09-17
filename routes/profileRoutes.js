// ========================================
// RUTAS DE PERFILES
// ========================================

const express =
    require("express");


const router =
    express.Router();


const profileController =
    require("../controllers/profileController");


// Crear perfil
router.post(
    "/",
    profileController.createProfile
);


// Obtener perfil por usuario
router.get(
    "/user/:userId",
    profileController.getProfileByUser
);


// Actualizar perfil
router.put(
    "/:id",
    profileController.updateProfile
);


// Eliminar perfil
router.delete(
    "/:id",
    profileController.deleteProfile
);


module.exports = router;