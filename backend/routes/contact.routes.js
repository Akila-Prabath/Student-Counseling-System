const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST Contact Message
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please fill required fields"
      });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });

    await newContact.save();

    res.status(201).json({
      message: "Message sent successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;