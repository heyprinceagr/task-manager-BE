const jwt = require("jsonwebtoken");
const User = require("../model/user.model")

// ------------------------------------------

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "No Auth Header Provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No Token Provided" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.email) {
            return res.status(400).json({ message: "Invalid Token Payload" });
        }

        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: "User not found in database with given token" });
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(403).json({ message: "Token is not valid" });
    }
};

module.exports = verifyToken;
