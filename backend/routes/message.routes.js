const express = require("express");
const Message = require("../models/Message");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
    try{
        const { receiverId, content } = req.body;

        if(!receiverId || !content) {
            return res.status(400).json({
                message: "Receiver and message content required"
            });
        }

        const newMessage = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content
        });

        await newMessage.save();

        res.status(201).json({
            message: "Message sent",
            newMessage
        });
    } catch (error) {
        res.status(500).json({ message: "Server error "});
    }
});

router.get("/:userId", protect, async (req, res) => {
    try{
        const otherUserId = req.params.userId;

        const message = await Message.find({
            $or: [
                { sender: req.user.id, receiver: otherUserId },
                { sender: otherUserId, receiver: req.user.id }
            ]
        })
            .populate("sender", "name role")
            .populate("receiver", "name role")
            .sort({ createdAt: 1 });
        
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 🔥 GET ALL MESSAGES (ADMIN)
router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender", "name")
      .populate("receiver", "name")
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔥 DELETE MESSAGE
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;