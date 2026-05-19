

const userModel = require('../Models/usermodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //  At top

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({ email }); 
        if (!user) {
            return res.status(401).json({
                msg: "Invalid credentials" 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        //  JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            msg: "Login successful",
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { loginUser }; //Outside function