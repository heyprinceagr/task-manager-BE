const jwt = require("jsonwebtoken");
const User = require("../model/user.model")
const bcrypt = require("bcryptjs");

// ----------------------------------------

// POST - /user/signup
const signUpUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const profileImg = req.file ? req.file.filename : null;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is Already Created with this email"
            });
        }

        const newUser = new User({
            username,
            email,
            password,
            profileImg
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: token
        });

    } catch (error) {
        console.error("Create User Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// POST - /user/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: token
        });

    } catch (error) {
        console.error("Login User Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


module.exports = {
    signUpUser,
    loginUser
}