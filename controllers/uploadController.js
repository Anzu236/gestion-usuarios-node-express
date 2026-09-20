// ========================================
// CONTROLADOR DE SUBIDA DE ARCHIVOS
// ========================================


// ========================================
// SUBIR ARCHIVO
// POST /upload
// ========================================

const uploadFile =
    async (req, res) => {

        try {

            // ====================================
            // VALIDAR QUE EXISTA ARCHIVO
            // ====================================

            if (!req.file) {

                return res
                    .status(400)
                    .json({

                        status:
                            "error",

                        message:
                            "Debe seleccionar un archivo",

                        data:
                            null

                    });

            }


            // ====================================
            // CONSTRUIR URL PÚBLICA
            // ====================================

            const fileUrl =
                `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;


            // ====================================
            // RESPUESTA
            // ====================================

            return res
                .status(201)
                .json({

                    status:
                        "success",

                    message:
                        "Archivo subido correctamente",

                    data: {

                        originalName:
                            req.file.originalname,

                        filename:
                            req.file.filename,

                        mimetype:
                            req.file.mimetype,

                        size:
                            req.file.size,

                        url:
                            fileUrl

                    }

                });

        }
        catch (error) {

            console.error(error);


            return res
                .status(500)
                .json({

                    status:
                        "error",

                    message:
                        "Error interno al subir el archivo",

                    data:
                        null

                });

        }

    };


// ========================================
// EXPORTAR CONTROLADOR
// ========================================

module.exports = {

    uploadFile

};