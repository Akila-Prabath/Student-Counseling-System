const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();


// ==========================================
// ✅ SEND MESSAGE
// ==========================================
router.post("/", protect, async (req, res) => {
    try {
        const { receiverId, content, isAnonymous } = req.body;

        if (!receiverId || !content) {
            return res.status(400).json({
                message: "Receiver and content are required"
            });
        }

        const msg = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content,
            isAnonymous: isAnonymous || false
        });

        await msg.save();

        const populated = await msg.populate(
            "sender receiver",
            "name profilePic role specialization"
        );

        res.json(populated);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error sending message" });
    }
});

// ==========================================
// ✅ GET CHAT LIST (LEFT SIDEBAR)
// ==========================================
router.get("/conversations/list", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
      .populate("sender", "name profilePic role specialization")
      .populate("receiver", "name profilePic role specialization")
      .sort({ createdAt: -1 });

    const conversationsMap = new Map();

    messages.forEach((msg) => {
      const otherUser =
        msg.sender._id.toString() === userId
          ? msg.receiver
          : msg.sender;

      const key = otherUser._id.toString();

      // 🔥 CREATE CONVERSATION IF NOT EXISTS
      if (!conversationsMap.has(key)) {
        conversationsMap.set(key, {
          user: otherUser,
          lastMessage: msg.content,
          createdAt: msg.createdAt,
          isAnonymous: false, // default
          _messages: [] // temp storage
        });
      }

      // 🔥 STORE ALL MESSAGES
      conversationsMap.get(key)._messages.push(msg);
    });

    // 🔥 FINAL PROCESS
    const conversations = Array.from(conversationsMap.values()).map(conv => {

      // 🔥 check if OTHER USER ever sent anonymous
      const isAnon = conv._messages.some(
        (m) =>
          m.isAnonymous &&
          m.sender._id.toString() !== userId
      );

      return {
        user: conv.user,
        lastMessage: conv.lastMessage,
        createdAt: conv.createdAt,
        isAnonymous: isAnon
      };
    });

    res.json(conversations);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching conversations" });
  }
});

// ==========================================
// ✅ GET CHAT BETWEEN TWO USERS
// ==========================================
router.get("/:userId", protect, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user.id }
            ]
        })
            .populate("sender", "name profilePic role specialization")
            .populate("receiver", "name profilePic role specialization")
            .sort({ createdAt: 1 });

        res.json(messages);

    } catch (err) {
        res.status(500).json({ message: "Error fetching messages" });
    }
});

// ==========================================
// ✅ ADMIN: GET ALL MESSAGES
// ==========================================
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


// ==========================================
// ✅ ADMIN DELETE MESSAGE
// ==========================================
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: "Message deleted" });

    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
});

module.exports = router;