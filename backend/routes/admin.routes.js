const express = require("express");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Contact = require("../models/Contact");

const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// 🔥 GET Dashboard Stats
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

module.exports = router;