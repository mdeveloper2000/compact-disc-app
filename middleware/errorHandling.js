import multer from "multer"

export const multerErrorHandling = (err, req, res, next) => {
    if(err instanceof multer.MulterError) {
        if(err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).send({ error: 1, message: "Tamanho máximo permitido para a imagem é 1 MB" })
        }
        return res.status(400).send({ error: 1, message: `Erro no upload: ${err.message}` })
    }
    else if(err.code === "INVALID_FILE_TYPE") {
        return res.status(400).send({ error: 1, message: "Erro ao enviar imagem, somente são aceitos arquivos PNG, JPG ou JPEG" })
    }
    next(err)
}