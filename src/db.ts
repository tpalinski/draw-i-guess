import {MongoClient} from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const password: string | null = process.env.DB_PASSWORD || ""

const connectionString = "mongodb+srv://admin:" + password + "@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority"

let collection;
const client = new MongoClient(connectionString);


export async function connectToDb() {
    try{
        await client.connect()
    } catch(e){
        console.error(e)
    }
}


