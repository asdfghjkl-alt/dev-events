"use server";

import api from "../axios";
import { Event } from "@/database/index";
import connectToDatabase from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectToDatabase();

    const event = await Event.findOne({ slug });
    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    })
      .limit(4)
      .lean();
    return similarEvents;
  } catch (e) {
    return [];
  }
};
[
  "08:30 AM - 09:30 AM | Keynote: AI-Driven Cloud Infrastructure",
  "09:45 AM - 11:00 AM | Deep Dives: Kubernetes, Data Analytics, Security",
  "11:15 AM - 12:30 PM | Product Demos & Networking",
];
