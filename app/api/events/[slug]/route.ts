import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { Event } from "@/database/index";

export const GET = apiHandler(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
  ) => {
    await connectToDatabase();

    const { slug } = await params;

    const event = await Event.findOne({ slug });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  },
);
