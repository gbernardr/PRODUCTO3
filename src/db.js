import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("Falta MONGODB_URI en el archivo .env");
}

if (!dbName) {
  throw new Error("Falta DB_NAME en el archivo .env");
}

const client = new MongoClient(uri);
let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log(`Conectado a MongoDB: ${dbName}`);
  }

  return db;
}
