import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    service: String,
    date: String,
    venue: String,
    budget: Number,
    message: String,
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
