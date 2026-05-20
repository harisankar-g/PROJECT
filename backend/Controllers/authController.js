const userModel = require('../Models/usermodels'); // Your User Model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Run: npm install jsonwebtoken
const saltRounds = 10;

// --- Register User ---
const registerUser = async (req, res) => {
    const {
        firstname, lastname, email, password,
        conformpassword, address, gender, phoneno
    } = req.body;

    try {
        // 1. Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // 2. Check if passwords match
        if (password !== conformpassword) {
            return res.status(400).json({ msg: "Passwords don't match" });
        }

        // 3. Hash the password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // 4. Create new user (without storing confirm password in DB usually, but following your model)
        const userData = new userModel({
            firstname,
            lastname,
            email,
            password: hashPassword,
            conformpassword: hashPassword, // You can skip storing this if not needed
            address,
            gender,
            phoneno
        });

        await userData.save();
        res.status(201).json({ msg: "User created successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// --- Login User ---
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // 3. Generate Token (JWT)
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET,
 // Add this in your .env file
            { expiresIn: "1h" }
        );

        res.status(200).json({ 
            msg: "Login successful", 
            token, 
            user: { 
                id: user._id, 
                name: user.firstname, 
                email: user.email 
            } 
        });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

module.exports = { registerUser, loginUser };