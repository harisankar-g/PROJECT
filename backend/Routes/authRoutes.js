const express = require('express');
const router = express.Router();
// Change 'authController' to 'AuthControllers' to match your file name
const { registerUser, loginUser } = require('../Controllers/AuthController');

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;