import express, { Request, Response } from "express"
import dotenv from "dotenv"
import http from "http"
import path from "path";
import { connectToDb} from "./db";
import { api } from "./routes";

dotenv.config()
const port = process.env.PORT || 3001;

const app = express()
const server = http.createServer(app)

// Attempt to connect to DB
connectToDb().then(() => {
    console.log("Connected successfully")
})

app.use(express.static(path.join(__dirname, "../", "public")))


app.get('/api', async (req: Request, res: Response) => {
    res.status(200).send("Refer to the documentation for api routes") 
})

app.use('/api', api)

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../", "public/index.html"))
})

server.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
