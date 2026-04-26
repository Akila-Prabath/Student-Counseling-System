const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");
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

// 🔥 GET ALL CONTACTS
router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔥 DELETE CONTACT
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});
module.exports = router;