// backend/Controllers/userControllers.js
const userModel = require('../Models/usermodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const saltRounds = 10;

// REGISTER
async function registerUser(req, res) {
    try {
        const { firstname, lastname, email, password, conformpassword, address, gender, phoneno } = req.body;
        
        const existing = await userModel.findOne({ email });
        if (existing) return res.status(400).json({ msg: "User exists" });
        
        if (password !== conformpassword) {
            return res.status(400).json({ msg: "Passwords don't match" });
        }
        
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const role = email === 'admin@cr7.com' ? 'admin' : 'user';
        
        const user = new userModel({
            firstname, lastname, email,
            password: hashPassword,
            conformpassword: hashPassword,
            address, gender, phoneno, role
        });
        
        await user.save();
        res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

// LOGIN
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        
        const token = jwt.sign(
            { id: user._id, role: user.role },
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
                phone: user.phoneno,
                address: user.address,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}

// FORGOT PASSWORD
async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ msg: "Email not registered" });
        
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        
        await user.save();
        res.status(200).json({ msg: "Reset token generated", resetToken });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}

// RESET PASSWORD
async function resetPassword(req, res) {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
        
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        
        if (!user) return res.status(400).json({ msg: "Invalid or expired token" });
        if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords do not match" });
        
        user.password = await bcrypt.hash(password, saltRounds);
        user.conformpassword = user.password;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        
        await user.save();
        res.status(200).json({ msg: "Password Reset Successful" });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}

// GET USER
async function getUser(req, res) {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}

// UPDATE USER
async function updateUser(req, res) {
    try {
        const { phone, address } = req.body;
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            { phoneno: phone, address: address },
            { new: true }
        );
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.status(200).json({ msg: "Updated", user });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}

// EXPORT ALL
module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUser,
    updateUser
};