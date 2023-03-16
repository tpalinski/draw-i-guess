import express, { Request, Response } from "express"
import dotenv from "dotenv"
import http from "http"
import path from "path";
import { connectToDb, generateRoomKey, registerRoom, removeRoom } from "./db";

dotenv.config()
const port = process.env.PORT || 3001;

const app = express()
const server = http.createServer(app)

// Attempt to connect to DB
connectToDb().then(() => {
    console.log("Connected successfully")
})

app.use(express.static(path.join(__dirname, "../", "public")))


app.get('/api', (req: Request, res: Response) => {
    res.status(200).send(generateRoomKey())
})

app.get('/insertUser', async (req: Request, res: Response) => {
    await registerRoom("Test Room", "Haslo"); 
    res.status(201).send("Successfully created room")
})

app.get('/deleteUser', async (req: Request, res: Response) => {
    await removeRoom("Test Room"); 
    res.status(201).send("Sucessfully deleted room")
})


app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../", "public/index.html"))
})

server.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
