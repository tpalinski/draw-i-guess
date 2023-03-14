import express from "express"
import dotenv from "dotenv"
import http from "http";

dotenv.config()
const port = process.env.PORT || 3001;


const app = express()
const server = http.createServer(app)


server.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
