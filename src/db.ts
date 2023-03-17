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

// Add room to database
export async function registerRoom(name: string, password: string): Promise<string | null>{
    let encryptedPassword = await encryptPassword(password);
    let roomKey = await generateRoomKey()
    let insertObject = {
        roomId: name, 
        password: encryptedPassword, 
        key: roomKey}
    try {
        await roomsCollection.insertOne(insertObject)
        return roomKey;
    } catch(e) {
        console.error(e)
        return null;
    }
}


// Delete room from database on host disconnection
export async function removeRoom(roomName: string) {
    let query = {roomId: roomName}
    try{
        await roomsCollection.findOneAndDelete(query); 
    } catch(e) {
        console.error(e)
    }
}

// Authenticate room connection and return roomkey
export async function getAccessToRoom(name: string, password: string) : Promise<string | null>{
    let query = {roomId: name}
    try{
        let room = await roomsCollection.findOne(query);
        if(room!=null){
           let encryptedPassword = room.password;
           return await bcrypt.compare(password, encryptedPassword) ? room.key : null 
        } else {
          return null; 
        }
    } catch(e) {
        console.error(e);
        return null;
    }
}

// Check, whether room with specified roomName exists in database
export async function checkForRoom(roomName: string) : Promise<boolean> {
    let query = {roomId: roomName}
    try{
        let room = await roomsCollection.findOne(query);
        return room != null;
    } catch(e){
        console.error(e)
        return false
    }
}

// Generate unique room key, used for validating one-time connection requests
 async function generateRoomKey(): Promise<string> {
    const KEY_LENGTH = 10
    let key: string = ""
    let characters: string = "qwertyuiopasdfghjklzxcvbnm1234567890"
    for (let i = 0; i<KEY_LENGTH; i++){
        key += characters[Math.floor(Math.random() * characters.length - 1)] 
    }
    key = await bcrypt.hash(key, 10)
    console.log(key)
    return key
}

// Helper function for password encryption using bcrypt
async function encryptPassword(password: string, salt: number = 10): Promise<string> {
    let res: string = await bcrypt.hash(password, salt);
    return res;
}
