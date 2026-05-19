// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllPaymentMethods,
  getPaymentMethod,
  initializePaymentMethods,
  togglePaymentMethod
} = require('../Controllers/paymentController');

// Public routes
router.get('/', getAllPaymentMethods);
router.get('/:id', getPaymentMethod);

// Admin routes (add auth middleware later)
router.post('/init', initializePaymentMethods);
router.patch('/:id/toggle', togglePaymentMethod);

module.exports = router;