const  express = require("express");
const Resource = require("../models/Resource");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, authorize("admin", "counselor"), async (req, res) => {
    try{
        const { title, description, type, link } = req.body;

        if(!title || !description || !type || !link) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const resource = new Resource({
            title,
            description,
            type,
            link,
            createdBy: req.user.description
        });

        await resource.save();

        res.status(201).json({
            message: "Resource added successfully",
            resource
        });
    } catch (error) {
        res.status(500).json ({ message: "Server error" });
    }
});

router.get("/", protect, async (req, res) => {
    try{
        const resources = await Resource.find()
            .populate("createdBy", "name role")
            .sort({ createdAt: -1});
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: "Serever error"});
    }
});

router.delete("/:id", protect, authorize("admin"), async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if(!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        await resource.deleteOne();

        res.json({
            message: "Resource deleted successfully"
        });
    } catch (eror) {
        res.status(500).json({ message: "Server eror"});
    }
});

module.exports = router;