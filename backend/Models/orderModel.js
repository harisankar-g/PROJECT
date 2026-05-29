// backend/Models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash_on_delivery', 'upi', 'debit_card', 'credit_card', 'Stripe']
  },
  paymentStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'paid', 'failed']
  },
  orderStatus: {
    type: String,
    default: 'placed',
    enum: ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled']
  },
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: String,
    default: ''
  },
  clientSecret: {
    type: String
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;