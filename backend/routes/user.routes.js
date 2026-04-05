const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get all counselors
router.get("/counselors", async (req, res) => {
  try {
    const counselors = await User.find({ role: "counselor" }).select("name email");
    res.json(counselors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;