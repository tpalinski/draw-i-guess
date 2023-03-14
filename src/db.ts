import {MongoClient} from "mongodb"
import dotenv from "dotenv"
import bcrypt from "bcrypt"


dotenv.config()

const password: string | null = process.env.DB_PASSWORD || ""

const connectionString = "mongodb+srv://admin:" + password + "@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority"


const client = new MongoClient(connectionString);
const db = client.db("kalambury")
let roomsCollection = db.collection("rooms");

export async function connectToDb() {
    try{
        await client.connect()
    } catch(e){
        console.error(e)
    }
}

export async function registerRoom(name: string, password: string){
    let encryptedPassword = await encryptPassword(password);
    let insertObject = {roomId: name, password: encryptedPassword}
    try {
        await roomsCollection.insertOne(insertObject)
    } catch(e) {
        console.error(e)
    }
}

async function encryptPassword(password: string, salt: number = 10): Promise<string> {
    let res: string = await bcrypt.hash(password, salt);
    return res;
}


export async function removeRoom(roomName: string) {
    let query = {roomId: roomName}
    try{
        await roomsCollection.findOneAndDelete(query); 
    } catch(e) {
        console.error(e)
    }
}