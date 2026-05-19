

const userModel = require('../Models/usermodels');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        
        const userData = new userModel({
            firstname, lastname, email,
            password: hashPassword,                
            conformpassword: hashPassword,
            address, gender, phoneno
        });
        
        await userData.save();
        res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server Error",e:error.message });
    }
};

module.exports = { registerUser };