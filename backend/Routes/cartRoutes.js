// const express = require('express');
// const router = express.Router();
// const cartController = require('../Controllers/cartController');

// // Routes
// router.get('/:userid', cartController.getCart);
// router.post('/add', cartController.addToCart);
// router.delete('/:userid/:productid', cartController.removeFromCart);
// module.exports = router;

const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');

router.get('/:userid', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/buynow', cartController.buyNow); // NEW: Single product buy
router.delete('/clear/:userid', cartController.clearCart); // NEW: Clear cart
router.delete('/:userid/:productid', cartController.removeFromCart);

module.exports = router;