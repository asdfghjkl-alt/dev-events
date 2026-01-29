import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { Event } from "@/database/index";
import { processEventImages } from "./helpers";

export const POST = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();

  const formData = await req.formData();
  const eventData = Object.fromEntries(formData.entries());

  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json(
      { message: "Image file is required" },
      { status: 400 },
    );
  }

  // Upload image to Cloudinary using helper
  const uploadedImages = await processEventImages([file]);
  const uploadedImage = uploadedImages[0];

  // Pass only the URL string to the event creation (assuming schema expects string)
  const newEvent = await Event.create({
    ...eventData,
    image: uploadedImage.url,
  });

  return NextResponse.json(
    { message: "Event created", event: newEvent },
    { status: 201 },
  );
});
