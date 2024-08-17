import { MongoClient } from "mongodb"
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI
const options = {}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}
export { clientPromise };

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(uri, { dbName: 'catalogue' });
    } catch (error) {
        console.log(error);
    }
}

export const disconnectMongoDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
}