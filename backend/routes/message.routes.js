const express = require("express");
const Message = require("../models/Message");
const { protect } = require("../middleware/auth.middleware");

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
            $r: [
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

module.exports = router;