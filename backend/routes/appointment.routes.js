const express = require("express");
const Appointment = require("../models/Appointment");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();


// 🔥 STUDENT: Book appointment
router.post("/", protect, authorize("student"), async (req, res) => {
  try {
    const { counselorId, serviceType, date, timeSlot, reason } = req.body;

    if (!counselorId || !serviceType || !date || !timeSlot || !reason) {
      return res.status(400).json({
        message: "Please provide all required fields"
      });
    }

    const newAppointment = new Appointment({
      student: req.user.id,
      counselor: counselorId,
      serviceType,
      date,
      timeSlot,
      reason
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 ADMIN: Get ALL appointments (IMPORTANT)
router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("student", "name email profilePic")
      .populate("counselor", "name email profilePic")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
});


// 🔥 COUNSELOR: View own appointments
router.get("/counselor", protect, authorize("counselor"), async (req, res) => {
  try {
    const appointments = await Appointment.find({
      counselor: req.user.id
    })
      .populate("student", "name email profilePic")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 STUDENT: View own appointments
router.get("/student", protect, authorize("student"), async (req, res) => {
  try {
    const appointments = await Appointment.find({
      student: req.user.id
    })
      .populate("counselor", "name email profilePic")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 COUNSELOR: Update status
router.put("/:id/status", protect, authorize("counselor"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    if (appointment.counselor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this appointment"
      });
    }

    appointment.status = status;
    await appointment.save();

    res.json({
      message: "Appointment status updated",
      appointment
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 ADMIN: Update status (optional but powerful)
router.put("/admin/:id/status", protect, authorize("admin"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.json({
      message: "Status updated by admin",
      appointment
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ✅ ADMIN can delete ANY
    if (req.user.role === "admin") {
      await appointment.deleteOne();
      return res.json({ message: "Deleted by admin" });
    }

    // ✅ STUDENT can delete own only
    if (req.user.role === "student") {
      if (appointment.student.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }

      await appointment.deleteOne();
      return res.json({ message: "Deleted by student" });
    }

    // ❌ others not allowed
    return res.status(403).json({ message: "Not allowed" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
});

router.put("/:id/reschedule", protect, authorize("student"), async (req, res) => {
  try {
    const { counselorId, date, timeSlot } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({ message: "Not found" });

    if (appointment.student.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    appointment.counselor = counselorId;
    appointment.date = date;
    appointment.timeSlot = timeSlot;
    appointment.status = "pending"; // reset

    await appointment.save();

    res.json({ message: "Rescheduled successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;