const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    conformpassword: { type: String, required: true },
    address: { type: String },
    gender: { type: String },
    phoneno: { type: String },
    role: { type: String, default: 'user' },  // Add this line
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date }
});

const userModel = mongoose.model('userregisters', userSchema);
module.exports = userModel;