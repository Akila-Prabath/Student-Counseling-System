const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Get all counselors
router.get("/counselors", async (req, res) => {
  try {
    const counselors = await User.find({ role: "counselor" });
    res.json(counselors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

const upload = require("../middleware/upload");

router.put("/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      specialization,
      experience,
      phone,
      bio
    } = req.body;

    const updateData = {
      name,
      username,
      email,
      specialization,
      experience,
      phone,
      bio
    };

    // 🔐 Password update (optional)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // 🖼️ Image update
    if (req.file) {
      updateData.profilePic = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;