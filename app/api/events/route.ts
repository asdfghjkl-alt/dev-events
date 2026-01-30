import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { Event } from "@/database/index";
import { processEventImages } from "./helpers";

export const POST = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();

  const formData = await req.formData();
  const eventData = Object.fromEntries(formData.entries());

  const files = formData.getAll("images") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json(
      { message: "Image file is required" },
      { status: 400 },
    );
  }

  let tags = JSON.parse(formData.get("tags") as string);
  let agenda = JSON.parse(formData.get("agenda") as string);

  const uploadedImages = await processEventImages(files);

  const newEvent = new Event({
    ...eventData,
    tags,
    agenda,
    images: uploadedImages,
  });

  await newEvent.save();

  return NextResponse.json(
    { message: "Event created", event: newEvent },
    { status: 201 },
  );
});

export const GET = apiHandler(async (req: NextRequest) => {
  await connectToDatabase();

  const events = await Event.find().sort({ createdAt: -1 });

  return NextResponse.json({ message: "Events fetched successfully", events });
});
