import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploadPicture = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /png|jpg|jpeg/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        if(!mimetype || !extname) {
            const error = new Error("Tipo de arquivo não permitido")
            error.code = "INVALID_FILE_TYPE"
            return cb(error)
        }
        return cb(null, true)
    }
})