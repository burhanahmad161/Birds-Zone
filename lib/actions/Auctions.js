// lib/birds.js or wherever your functions are
import { getDb } from "../connector"; // or directly use clientPromise if you prefer

export const createBird = async ({
  species,
  age,
  color,
  gender,
  isBreeder,
  clutches,
  whatsapp,
  description,
  price,
  imageUrl,
  city,
}) => {
  try {
    const db = await getDb();
    const collection = db.collection("BirdsCollection");

    const birdId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const createdAt = new Date().toISOString();

    const newBird = {
      birdId,
      species,
      age,
      color,
      gender,
      isBreeder,
      clutches,
      whatsapp,
      description,
      imageUrl,
      price,
      approvalStatus: "Pending",
      city,
      createdAt,
    };

    const result = await collection.insertOne(newBird);

    if (!result.acknowledged) {
      throw new Error("Failed to insert bird");
    }

    return { ...newBird, _id: result.insertedId };
  } catch (error) {
    console.error("Error creating bird:", error);
    throw new Error(error.message || "Failed to create bird");
  }
  // No need to close connection — it's reused!
};

export const getBirds = async () => {
  try {
    const db = await getDb();
    const birds = await db.collection("BirdsCollection").find({}).toArray();
    return birds;
  } catch (error) {
    console.error("Error fetching birds:", error);
    throw new Error("Failed to fetch birds");
  }
};

export const updateBirdStatus = async ({ birdId }) => {
  try {
    const db = await getDb();
    const result = await db.collection("BirdsCollection").updateOne(
      { birdId },
      { $set: { approvalStatus: "Approved" } }
    );

    return result;
  } catch (error) {
    console.error("Error updating bird status:", error);
    throw new Error("Failed to update bird status");
  }
};