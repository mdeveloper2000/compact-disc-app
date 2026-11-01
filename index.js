import express from "express"
import discRouter from "./routes/discRoutes.js"

const app = express()

app.use(express.json())
app.use(express.static("public"))
app.set("view engine", "ejs")

app.use(discRouter)

app.listen(process.env.PORT, () => {
    console.log(`Running on: http://localhost:${process.env.PORT}`)
})