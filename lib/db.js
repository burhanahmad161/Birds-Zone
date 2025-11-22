// import mongoose from 'mongoose';

// let isConnected = false;


// export const connectToDatabase = async () => {
//     mongoose.set('strictQuery', true);

//     if (!process.env.MONGODB_URL){
//         return console.log('MISSING MONGODB_URL');

//     }
//         if (isConnected){
//         return;
//     }

//     try {
//         await mongoose.connect(process.env.MONGODB_URL, {
//             dbName: 'birds-zone'
//         })

//         isConnected = true;
//         console.log('MongoDB is connected')

//     } catch (error) {
//         console.log(error);
//     }
// }
// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error("Please define MONGO_URI in your environment variables");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    // In development, use a global variable so that the connection is preserved across hot reloads
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, it's best to not use a global variable
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise; // This promise resolves to the connected client