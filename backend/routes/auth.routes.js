const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();


// ================= REGISTER =================
router.post("/register", async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Validation
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        // Check existing email
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Check existing username
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(409).json({
                message: "Username already taken"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            role: "student"
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("FULL ERROR:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Please provide username and password"
            });
        }

        // Find user by username
        const user = await User.findOne({ username
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Check JWT secret BEFORE signing
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message: "JWT secret not configured"
            });
        }

        // Generate token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("FULL ERROR:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;