import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://donghun:gFCZS27xZrseet1D@cluster0.cctfa7o.mongodb.net/?retryWrites=true&w=majority'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db('events');
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, eventId, sort) {
  const db = client.db('events');
  const documents = await db
    .collection(collection)
    .find({ eventId: eventId })
    .sort(sort)
    .toArray();

  return documents;
}
