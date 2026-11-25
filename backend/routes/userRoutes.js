import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/users - Fetch all registered demo users (same logic as GET /api/students)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// POST /api/users - Register a new user (Week 1: no authentication/hashing yet)
router.post("/", async (req, res) => {
  try {
    const { name, email, department, role, phone, meetupSpot, bio } = req.body;

    const user = await User.create({
      name,
      email,
      department,
      role: role || "buyer",
      phone: phone || "",
      meetupSpot: meetupSpot || "Main Campus Library",
      bio: bio || ""
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Error creating user" });
  }
});

// PUT /api/users/:id - Update user profile fields (supports Profile Component)
router.put("/:id", async (req, res) => {
  try {
    const { name, department, role, phone, meetupSpot, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, department, role, phone, meetupSpot, bio },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Error updating user profile" });
  }
});

export default router;
