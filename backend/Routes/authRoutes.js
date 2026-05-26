// backend/Routes/authRoutes.js

const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
} = require('../Controllers/userControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);

module.exports = router;