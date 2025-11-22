// lib/db.js
import clientPromise from "./db";

const dbName = "birds-zone";

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}