// backend/Routes/userRoutes.js

const express = require('express');
const router = express.Router();

const { updateUser, getUser } = require('../Controllers/userControllers');

router.put('/:id', updateUser);
router.get('/:id', getUser);

module.exports = router;