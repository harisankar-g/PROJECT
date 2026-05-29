// backend/Controllers/orderController.js
const Order = require('../Models/Order');
const Product = require('../Models/productModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Order with Stock Decrease
const createOrder = async (req, res) => {
  try {
    const { userId, items, paymentMethod, totalAmount, shippingAddress } = req.body;
    
    // Check stock first
    for (const item of items) {
      const product = await Product.findById(item.productid);
      if (!product) {
        return res.status(400).json({ msg: `Product not found` });
      }
      if (product.product_quantity < item.quantity) {
        return res.status(400).json({ msg: `Not enough stock for ${product.product_name}` });
      }
    }
    
    // Decrease stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productid, {
        $inc: { product_quantity: -item.quantity }
      });
      console.log(`✅ Stock decreased for item ${item.productid}`);
    }
    
    let clientSecret = null;
    let paymentStatus = 'pending';
    
    // Stripe payment
    if (paymentMethod === 'Stripe') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: 'inr',
        metadata: { userId }
      });
      clientSecret = paymentIntent.client_secret;
    }
    
    // Create order
    const order = new Order({
      userId,
      items,
      paymentMethod,
      totalAmount,
      shippingAddress,
      paymentStatus,
      clientSecret,
      orderStatus: 'placed'
    });
    
    await order.save();
    
    res.json({
      success: true,
      msg: 'Order created - Stock updated',
      orderId: order._id,
      clientSecret
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get User's Orders
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate('items.productid');
    
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get Single Order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.productid');
    
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { paymentStatus, orderStatus } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { paymentStatus, orderStatus },
      { new: true }
    );
    
    res.json({ success: true, msg: 'Order updated', order });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
};