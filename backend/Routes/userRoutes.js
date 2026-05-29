// backend/Routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Import directly
const { getUser, updateUser } = require('../Controllers/userControllers');

// Debug: Check if functions are imported
// console.log('getUser:', getUser);
// console.log('updateUser:', updateUser);

router.get('/:id', getUser);
router.put('/:id', updateUser);

module.exports = router;