import { Schema, models, model } from "mongoose";

export interface IImage {
  url: string;
  filename: string;
  size: number;
}

// Interface for the Event document, defining raw data structure
export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: IImage[];
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_300,h_300,c_pad");
});
imageSchema.virtual("main").get(function () {
  return this.url.replace("/upload", "/upload/w_1200,h_1200,c_pad");
});
imageSchema.virtual("display").get(function () {
  return this.url.replace("/upload", "/upload/w_500,h_500,c_pad");
});

// Mongoose Schema definition
const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: [imageSchema], required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true },
    audience: { type: String, required: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true },
);

// Pre-save hook: Slug generation and Date normalization
EventSchema.pre("save", function () {
  // Generate slug from title if title is modified
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove non-word chars
      .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with -
      .replace(/^-+|-+$/g, ""); // Trim leading/trailing -
  }

  // Normalize date to ISO string if modified
  if (this.isModified("date")) {
    const parsedDate = new Date(this.date);
    if (!isNaN(parsedDate.getTime())) {
      this.date = parsedDate.toISOString();
    } else {
      throw new Error("Invalid date format");
    }
  }

  // Ensure time is present (can be enhanced with regex validation if needed)
  if (!this.time) {
    throw new Error("Time is required");
  }
});

// Avoid recompilation in hot-reload
const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
