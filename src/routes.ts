import express, {Request, Response} from "express"
import { removeRoom, registerRoom } from "./db";

export const api = express()


api.get('/insertUser', async (req: Request, res: Response) => {
    await registerRoom("Test Room", "Haslo"); 
    res.status(201).send("Successfully created room")
})

api.get('/deleteUser', async (req: Request, res: Response) => {
    await removeRoom("Test Room"); 
    res.status(201).send("Sucessfully deleted room")
})

