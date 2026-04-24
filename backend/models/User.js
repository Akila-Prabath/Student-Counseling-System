const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["student", "counselor", "admin"],
            default: "student"
        },

        profilePic: {
            type: String
        },
        faculty: {
            type: String
        },

        contactNumber: {
            type: String
        },

        profileImage: {
            type: String
        },

        specialization: {
            type: String
        },

        experience: { 
            type: String
        },
        
        phone: {
            type: String
        },

        bio: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);