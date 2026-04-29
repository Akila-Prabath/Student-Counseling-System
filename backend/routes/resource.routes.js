const express = require("express");
const Resource = require("../models/Resource");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();


// 🔥 CREATE RESOURCE
router.post("/", protect, authorize("admin", "counselor"), async (req, res) => {
  try {
    const { title, description, type, link, visibleTo } = req.body;

    if (!title || !description || !type || !link) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const resource = new Resource({
      title,
      description,
      type,
      link,
      createdBy: req.user.id,
      visibleTo: visibleTo || [] // ✅ FIX
    });

    await resource.save();

    // 🔥 populate creator before sending
    const populatedResource = await resource.populate("createdBy", "name role");

    res.status(201).json(populatedResource);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 GET ALL RESOURCES
router.get("/", protect, async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate("createdBy", "name role")
      .populate("visibleTo", "_id name")
      .sort({ createdAt: -1 });

    res.json(resources);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 DELETE RESOURCE (ADMIN ONLY)
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 prevent crash
    if (!id || id === "undefined") {
      return res.status(400).json({ message: "Invalid resource ID" });
    }

    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found"
      });
    }

    await resource.deleteOne();

    res.json({
      message: "Resource deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 OPTIONAL: UPDATE RESOURCE (future use)
router.put("/:id", protect, authorize("admin", "counselor"), async (req, res) => {
  try {
    const { title, description, type, link, visibleTo } = req.body;

    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    resource.title = title;
    resource.description = description;
    resource.type = type;
    resource.link = link;
    resource.visibleTo = visibleTo || [];

    await resource.save();

    const updated = await resource.populate("createdBy", "name role");

    res.json(updated);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

router.get("/student", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const resources = await Resource.find({
      $or: [
        { visibleTo: { $exists: false } },   // safety
        { visibleTo: { $size: 0 } },         // public
        { visibleTo: userId }                // assigned
      ]
    })
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(resources);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;