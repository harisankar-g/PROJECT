const express = require('express');
const router = express.Router();
const { getAllPaymentMethods, initializePaymentMethods } = require('../Controllers/paymentController');

router.get('/', getAllPaymentMethods);
router.post('/init', initializePaymentMethods);

module.exports = router;