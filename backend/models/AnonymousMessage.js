const mongoose = require("mongoose")

const anonymousMessageSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },
        reply: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ["pending","answered"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("AnonymousMessage", anonymousMessageSchema);