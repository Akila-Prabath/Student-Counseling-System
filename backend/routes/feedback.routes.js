const express = require("express");
const Feedback = require("../models/Feedback");
const Appointment = require("../models/Appointment");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, authorize("student"), async (req, res) => {
  try {
    const { appointmentId, rating, comment } = req.body;

    if (!appointmentId || !rating) {
      return res.status(400).json({
        message: "Appointment and rating required"
      });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    // Ensure student owns the appointment
    if (appointment.student.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    const feedback = new Feedback({
      student: req.user.id,
      counselor: appointment.counselor,
      appointment: appointmentId,
      rating,
      comment
    });

    await feedback.save();

    res.status(201).json({
      message: "Feedback submitted",
      feedback
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/counselor", protect, authorize("counselor"), async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      counselor: req.user.id
    })
      .populate("student", "name email")
      .populate("appointment")
      .sort({ createdAt: -1 });

    res.json(feedbacks);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("student", "name email")
      .populate("counselor", "name email")
      .sort({ createdAt: -1 });

    res.json(feedbacks);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;