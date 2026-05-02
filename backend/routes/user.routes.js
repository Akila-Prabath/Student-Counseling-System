const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth.middleware");

const Appointment = require("../models/Appointment");
const Message = require("../models/Message");


// ================= SPECIAL ROUTES FIRST =================

// 🔐 CHANGE PASSWORD
router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating password" });
  }
});


// 📊 USER STATS
router.get("/stats", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.countDocuments({
      $or: [{ student: userId }, { counselor: userId }]
    });

    const messages = await Message.countDocuments({
      $or: [{ sender: userId }, { receiver: userId }]
    });

    res.json({ appointments, messages });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching stats" });
  }
});


// ================= NORMAL ROUTES =================

// Get all counselors
router.get("/counselors", async (req, res) => {
  try {
    const counselors = await User.find({ role: "counselor" });
    res.json(counselors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get students
router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE user
router.put("/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id === "undefined") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

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

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      updateData.profilePic = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

// GET user by id (KEEP LAST)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

module.exports = router;