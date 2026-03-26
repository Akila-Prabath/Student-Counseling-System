const express = require("express");
const AnonymousMessage = require("../models/AnonymousMessage");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Question is required"
            });
        }
        const newMessage = new AnonymousMessage({
            question
        });

        await newMessage.save();

        res.status(201).json({
            message: "Question submitted anonymously"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/", protect, authorize("counselor","admin"), async (req, res) => {
    try{
        const message = (await AnonymousMessage.find()).toSorted({ createdAt: -1 });
        res.json(message);
    } catch (eror) {
        res.status(500).json({ message: "Server error"});
    }
});

router.put("/:id/reply", protect, authorize("counselor", "admin"), async (req, res) => {
    try {
        const { reply } = req.body;
        if (!reply) {
            return res.status(400).json({
                message: "Reply is required"
            });
        }
        const message = await AnonymousMessage.findById(req.params.id);
        if(!message) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        message.reply = reply;
        message.status = "answered";

        await message.save();

        res.json({
            message: "Reply added successfully",
            message
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;