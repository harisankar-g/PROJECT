// backend/Routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');

// Routes
router.get('/:userid', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/buynow', cartController.buyNow);
router.delete('/clear/:userid', cartController.clearCart);
router.delete('/:userid/:productid', cartController.removeFromCart);

module.exports = router;