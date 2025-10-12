import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const Testimonial =
  mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
