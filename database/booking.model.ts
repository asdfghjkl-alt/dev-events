import { Schema, models, model, Types } from "mongoose";
import Event from "./event.model";

// Interface for Booking document
export interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

// Pre-save hook: Validate Event existence and Email format
BookingSchema.pre("save", async function () {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    throw new Error("Invalid email format");
  }

  // Check if referenced Event exists
  try {
    const eventExists = await Event.findById(this.eventId);
    if (!eventExists) {
      throw new Error("Event not found");
    }
  } catch (error) {
    throw error as Error;
  }
});

// Index for fast event lookup
BookingSchema.index({ createdAt: -1 });

// Index for fast email lookup
BookingSchema.index({ email: 1 });

// Ensure unique booking per event per email
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Avoid recompilation
const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
