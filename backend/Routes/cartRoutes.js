const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');

// Routes
router.get('/:userid', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/:userid/:productid', cartController.removeFromCart);
module.exports = router;