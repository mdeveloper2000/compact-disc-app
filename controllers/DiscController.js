import database from "../config/config.js"
import fs from "fs"
import path from "path"

export const index = async(req, res) => {
    try {
        const query = database.prepare("SELECT * FROM discs ORDER BY id DESC LIMIT 100")
        const discs = query.all()
        res.render("index", { page: "Início", discs })
    }
    catch(error) {
        console.log(error)
    }
}

export const create = (req, res) => {
    try {
        res.render("create", { page: "Registro" })
    }
    catch(error) {
        console.log(error)
    }
}

export const store = (req, res, next) => {    
    try {
        if(!req.file) {
            return res.status(400).send({ error: 1, message: "Nenhuma imagem foi selecionada" })
        }
        const { name, description } = req.body
        const statement = database.prepare("INSERT INTO discs (name, image, description) VALUES (?, ?, ?)")
        const result = statement.run(name, req.file.filename, description)
        if(result.changes > 0) {
            res.send({ error: 0 })
        }
        else {
            res.status(500).send({ error: 1, message: "Erro ao registrar disco" })
        }
    }
    catch(error) {
        next(error)
    }
}

export const show = (req, res) => {
    try {
        const id = req.params.id
        const statement = database.prepare("SELECT * FROM discs WHERE id = ?")
        const disc = statement.get(id)
        if(!disc) {
            res.redirect("/")
        }
        else {
            res.render("show", { page: "Informações", disc })
        }
    }
    catch(error) {
        console.log(error)
    }
}

export const edit = (req, res) => {
    try {
        const id = req.params.id
        const statement = database.prepare("SELECT * FROM discs WHERE id = ?")
        const disc = statement.get(id)
        if(!disc) {
            res.redirect("/")
        }
        else {
            res.render("edit", { page: "Edição", disc })
        }
    }
    catch(error) {
        console.log(error)
    }
}

export const update = (req, res, next) => {
    try {
        const { id, name, description } = req.body
        const statement = database.prepare("SELECT * FROM discs WHERE id = ?")
        const disc = statement.get(id)
        if(!disc) {
            return res.send({ error: 1 })
        }
        else {
            const statement = database.prepare("UPDATE discs SET name = ?, description = ?, image = ? WHERE id = ?")
            const image = req.file ? req.file.filename : disc.image
            const result = statement.run(name, description, image, id)
            if(result.changes > 0) {
                if(req.file !== undefined) {
                    const filePath = path.resolve("./public/uploads/", disc.image)                
                    if(fs.existsSync(filePath)) {
                        fs.unlink(filePath, (err) => {
                            if(err) {
                                console.error("Erro ao excluir o arquivo:", err)
                            }
                            else {
                                console.log("Arquivo excluído com sucesso:", filePath)
                            }
                        })
                    }
                }
                res.send({ error: 0 })
            }
            else {
                res.status(500).send({ error: 1, message: "Erro ao atualizar disco" })
            }
        }
    }
    catch(error) {
        next(error)
    }
}

export const destroy = (req, res) => {
    try {
        const { id } = req.body
        const statement = database.prepare("SELECT * FROM discs WHERE id = ?")
        const disc = statement.get(id)
        if(!disc) {
            return res.status(404).send({ error: 1, message: "Disco não encontrado" })
        }
        const statementDelete = database.prepare("DELETE FROM discs WHERE id = ?")
        const result = statementDelete.run(disc.id)
        if(result.changes > 0) {
            const filePath = path.resolve("./public/uploads/", disc.image)
            if(fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if(err) {
                        console.error("Erro ao excluir o arquivo:", err)
                    }
                })
            }
            else {
                return res.status(200).send({ error: 1, message: "Disco sem imagem excluído" })
            }
            return res.send({ error: 0 })
        }
        return res.status(500).send({ error: 1, message: "Erro ao excluir disco"})
    }
    catch(error) {
        console.error(error)
        return res.status(500).send({ error: 1, message: "Erro ao excluir disco" })
    }
}

export const search = (req, res) => {
    const query = req.params.query
    try {
        const statement = database.prepare("SELECT * FROM discs WHERE name LIKE ?")
        const discs = statement.all(`%${query}%`)
        res.render("index", { page: "Início", discs })        
    }
    catch(error) {
        console.log(error)
    }
}

export const notfound = (req, res) => {
    try {
        res.redirect("/")
    }
    catch(error) {
        console.log(error)
    }
}