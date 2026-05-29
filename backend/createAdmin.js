// backend/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    address: String,
    gender: String,
    phoneno: String,
    role: { type: String, default: 'user' },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

const User = mongoose.model('User', userSchema, 'users');

async function createAdmin() {
    await mongoose.connect(process.env.MONGO_URI);
    
    const newPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await User.findOneAndUpdate(
        { email: 'admin@cr7.com' },
        { 
            firstname: 'Admin',
            lastname: 'User',
            email: 'admin@cr7.com',
            password: newPassword,
            role: 'admin',
            resetPasswordToken: null,
            resetPasswordExpire: null
        },
        { upsert: true, new: true }
    );
    
    console.log('Admin created/updated:', admin.email);
    console.log('Password: admin123');
    
    process.exit();
}

createAdmin();