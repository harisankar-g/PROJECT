// backend/Routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  updateOrderStatus,
  cancelOrder 
} = require('../Controllers/orderController');

router.post('/create', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/:orderId', getOrderById);
router.put('/:orderId', updateOrderStatus);
router.put('/cancel/:orderId', cancelOrder);  // Cancel and restore stock

module.exports = router;