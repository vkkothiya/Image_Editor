import mongoose, { Mongoose } from 'mongoose';

const MONGO_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGO_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGO_URL, { 
      dbName: 'imageEditor', bufferCommands: false 
    })
    // .then(() => console.log("database connected.")
    // )
    // .catch(() => console.log("Something went wrong.")
    // )

  cached.conn = await cached.promise;

  return cached.conn;
}