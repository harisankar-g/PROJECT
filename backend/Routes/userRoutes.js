
const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/userControllers');
const { loginUser } = require('../Controllers/AuthController');

router.post('/register', registerUser);    
router.post('/login', loginUser);         

module.exports = router;