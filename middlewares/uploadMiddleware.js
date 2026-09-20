// ========================================
// MIDDLEWARE PARA SUBIDA DE ARCHIVOS
// ========================================


// Importar Multer
const multer =
    require("multer");


// Importar Path
const path =
    require("path");


// Importar File System
const fs =
    require("fs");


// Importar Crypto
const crypto =
    require("crypto");


// ========================================
// CARPETA DE DESTINO
// ========================================

const uploadDirectory =
    path.join(
        __dirname,
        "..",
        "public",
        "uploads"
    );


// Crear carpeta si no existe
fs.mkdirSync(
    uploadDirectory,
    {
        recursive: true
    }
);


// ========================================
// TIPOS PERMITIDOS
// ========================================

const allowedMimeTypes = [

    "image/jpeg",
    "image/png",
    "image/webp"

];


const allowedExtensions = [

    ".jpg",
    ".jpeg",
    ".png",
    ".webp"

];


// ========================================
// CONFIGURACIÓN DE ALMACENAMIENTO
// ========================================

const storage =
    multer.diskStorage({

        destination:
            (
                req,
                file,
                callback
            ) => {

                callback(
                    null,
                    uploadDirectory
                );

            },


        filename:
            (
                req,
                file,
                callback
            ) => {

                const extension =
                    path
                        .extname(
                            file.originalname
                        )
                        .toLowerCase();


                const uniqueName =
                    `${Date.now()}-${crypto.randomUUID()}${extension}`;


                callback(
                    null,
                    uniqueName
                );

            }

    });


// ========================================
// VALIDACIÓN DEL TIPO DE ARCHIVO
// ========================================

const fileFilter =
    (
        req,
        file,
        callback
    ) => {

        const extension =
            path
                .extname(
                    file.originalname
                )
                .toLowerCase();


        const validMimeType =
            allowedMimeTypes.includes(
                file.mimetype
            );


        const validExtension =
            allowedExtensions.includes(
                extension
            );


        if (
            validMimeType &&
            validExtension
        ) {

            return callback(
                null,
                true
            );

        }


        return callback(
            new Error(
                "INVALID_FILE_TYPE"
            )
        );

    };


// ========================================
// CONFIGURACIÓN DE MULTER
// ========================================

const upload =
    multer({

        storage,

        limits: {

            // Máximo 2 MB
            fileSize:
                2 * 1024 * 1024

        },

        fileFilter

    });


// ========================================
// MIDDLEWARE PERSONALIZADO
// ========================================
//
// Campo esperado:
// file
//
// Este wrapper permite devolver todos
// los errores con nuestro formato JSON.

const uploadSingleImage =
    (req, res, next) => {

        upload.single("file")(
            req,
            res,
            (error) => {

                // ====================================
                // SIN ERROR
                // ====================================

                if (!error) {

                    return next();

                }


                // ====================================
                // ARCHIVO DEMASIADO GRANDE
                // ====================================

                if (
                    error instanceof
                        multer.MulterError &&
                    error.code ===
                        "LIMIT_FILE_SIZE"
                ) {

                    return res
                        .status(400)
                        .json({

                            status:
                                "error",

                            message:
                                "El archivo supera el tamaño máximo permitido de 2 MB",

                            data:
                                null

                        });

                }


                // ====================================
                // TIPO NO PERMITIDO
                // ====================================

                if (
                    error.message ===
                    "INVALID_FILE_TYPE"
                ) {

                    return res
                        .status(400)
                        .json({

                            status:
                                "error",

                            message:
                                "Tipo de archivo no permitido. Solo se aceptan JPG, JPEG, PNG y WEBP",

                            data:
                                null

                        });

                }


                // ====================================
                // OTRO ERROR
                // ====================================

                return res
                    .status(400)
                    .json({

                        status:
                            "error",

                        message:
                            "Error al procesar el archivo",

                        data:
                            null

                    });

            }
        );

    };


// ========================================
// EXPORTAR
// ========================================

module.exports = {

    uploadSingleImage

};