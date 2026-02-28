const express = require("express");
const Appointment = require("../models/Appointment");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// student book appointment
router.post("/", protect, authorize("student"), async (req, res) => {
    try {
        const { counselorID, date, timeSlot, reason } = req.body;

        if (!counselorID || !date || !timeSlot || !reason) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const newAppointment = new Appointment({
            student: req.user.id,
            counselor: counselorID,
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

//counselor views their appointments
router.get("/counselor", protect, authorize("counselor"), async (req, res) => {
    try {
        const appointments = await Appointment.find({
            counselor:req.user.id
        }).populate("student", "name email");

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

//student views their appointments
router.get("/student", protect, authorize("student"), async (req, res) => {
    try {
        const appointments = await Appointment.find({
            student: req.user.id
        }).populate("counselor", "name email");

        res.json(appointments);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

//counselor approves or rejects appointment
router.put("/:id/status", protect, authorize("counselor"), async (req, res) => {
    try{
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

module.exports = router;