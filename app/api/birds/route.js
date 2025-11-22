import { v2 as cloudinary } from "cloudinary";
import { createBird, getBirds } from "../../../lib/actions/Auctions";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const species = formData.get("species");
    const age = formData.get("ageRange");
    const color = formData.get("eyeColor");
    const gender = formData.get("gender");
    const image = formData.get("image");
    const isBreeder = formData.get("isBreeder");
    const clutches = formData.get("clutches");
    const whatsapp = formData.get("whatsapp");
    const description = formData.get("description");
    const price = formData.get("price");
    const city = formData.get("city");
    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert image to Base64
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "auctions",
    });

    // Save new auction
    const newBird = await createBird({
        species,
        age,
        color,
        gender,
        isBreeder,
        clutches,
        whatsapp,
        description,
        price,
        city,
        imageUrl: uploadResult.secure_url,
    });

    return NextResponse.json(newBird, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const GET = async (req) => { 
    try {
        const birds = await getBirds();
        return NextResponse.json(birds, { status: 200 });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
};