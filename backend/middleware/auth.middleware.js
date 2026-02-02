const jwt = require("jsonwebtoken");
const { base } = require("../models/User");

exports.protect = (req, res, next) => {
    try{
        const authHeader = req.header.authorization;

        if (!authHeader || !authHeader.startWith("Bearer")) {
            return res.status(401).json({
                message: "Not authorixed, no token"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token is not valid"
        });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json ({
                message: "You do not have permission"
            });
        }

        next();
    };
};