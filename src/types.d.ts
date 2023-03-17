export {}


export interface Room {
    roomId: string,
    password?: string,
    key?: string
}

declare global {
    namespace Express {
        export interface Request {
            room: Room
        }
    }
}


