import { DatabaseSync } from "node:sqlite"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const databasePath = path.resolve(__dirname, "../database/database.sqlite")

if(!fs.existsSync(databasePath)) {
    fs.writeFileSync(databasePath, "")
}

const database = new DatabaseSync(databasePath)

const query = `
    CREATE TABLE IF NOT EXISTS discs (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL
    );
    `
database.exec(query)

export default database