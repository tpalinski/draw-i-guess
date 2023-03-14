import express, { Request, Response } from "express"
import dotenv from "dotenv"
import http from "http"
import path from "path";

dotenv.config()
const port = process.env.PORT || 3001;


const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, "../", "public")))

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../", "public/index.html"))
})




server.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
