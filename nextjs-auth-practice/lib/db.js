import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://donghun:${process.env.DB_URI}@cluster0.ls4pgza.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
