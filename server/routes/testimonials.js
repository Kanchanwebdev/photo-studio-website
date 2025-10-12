import express from "express";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

// GET all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new testimonial
router.post("/", async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    const newTestimonial = new Testimonial({ name, message, rating });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update testimonial
router.put("/:id", async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, message, rating },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE testimonial
router.delete("/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
