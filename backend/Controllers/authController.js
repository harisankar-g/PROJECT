const userModel = require('../Models/usermodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const saltRounds = 10;

// --- Register User ---
const registerUser = async (req, res) => {
    const {
        firstname, lastname, email, password,
        conformpassword, address, gender, phoneno
    } = req.body;

    try {
        const existingUser = await userModel.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        if (password !== conformpassword) { 
            return res.status(400).json({ msg: "Passwords don't match" });
        }

        const hashPassword = await bcrypt.hash(password, saltRounds); 
        
        // Auto-detect admin
        const role = email === 'admin@cr7.com' ? 'admin' : 'user';
        
        const userData = new userModel({
            firstname, lastname, email,
            password: hashPassword,                
            conformpassword: hashPassword,
            address, gender, phoneno,
            role: role
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
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Check if admin
        const isAdmin = email === 'admin@cr7.com' || user.role === 'admin';

        const token = jwt.sign(
            { id: user._id, role: isAdmin ? 'admin' : 'user' },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.firstname,
                email: user.email,
                role: isAdmin ? 'admin' : 'user'
            }
        });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// --- FORGOT PASSWORD ---
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found with this email" });
        }

        // Generate Reset Token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token and save to DB (Expires in 10 minutes)
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // For Dev: Return the link directly (In Production, send via Email)
        res.status(200).json({ 
            msg: "Password Reset Link Generated",
            resetToken: resetToken // In production, remove this and send via email
        });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// --- RESET PASSWORD ---
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    try {
        // Hash the token from URL to match with DB hash
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: "Invalid or expired token" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        // Hash new password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashPassword;
        user.conformpassword = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ msg: "Password Reset Successful" });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };