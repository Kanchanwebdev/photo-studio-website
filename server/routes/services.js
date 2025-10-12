import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// 🌱 Seed default services (optional, protected manually)
router.post("/seed", async (req, res) => {
  try {
    await Service.deleteMany({});
    const services = await Service.insertMany([
      { title: "Wedding Photography", description: "Full day coverage", price: 50000 },
      { title: "Pre-wedding Shoot", description: "Cinematic shoot at 2 locations", price: 20000 },
    ]);
    res.json({ message: "Services seeded successfully", services });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🆕 Add Service (used by Admin Dashboard)
router.post("/add", async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = new Service({
      title,
      description,
      price,
      category,
      image,
    });

    await newService.save();
    res.status(201).json({ message: "Service added successfully", service: newService });
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🌍 Public: Get All Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ Update service
router.put("/:id", async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🗑️ Delete service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
