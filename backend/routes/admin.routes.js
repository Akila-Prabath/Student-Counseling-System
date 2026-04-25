const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Contact = require("../models/Contact");

const { protect, authorize } = require("../middleware/auth.middleware");
const bcrypt = require("bcryptjs");
const upload = require("../middleware/upload");


// 🔥 DASHBOARD STATS
router.get("/stats", protect, authorize("admin"), async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "student" });
    const counselors = await User.countDocuments({ role: "counselor" });
    const appointments = await Appointment.countDocuments();
    const messages = await Contact.countDocuments();

    res.json({
      students,
      counselors,
      appointments,
      messages
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 GET ADMIN PROFILE
router.get("/profile", protect, authorize("admin"), async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select("-password");
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});


// 🔥 UPDATE ADMIN PROFILE
router.put(
  "/profile",
  protect,
  authorize("admin"),
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      const updateData = {};

      if (name) updateData.name = name;
      if (username) updateData.username = username;
      if (email) updateData.email = email;

      // 🔐 Password
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }

      // 🖼️ Image
      if (req.file) {
        updateData.profilePic = req.file.filename;
      }

      const updatedAdmin = await User.findByIdAndUpdate(
        req.user.id,
        updateData,
        { new: true }
      ).select("-password");

      res.json(updatedAdmin);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Update failed" });
    }
  }
);

module.exports = router;