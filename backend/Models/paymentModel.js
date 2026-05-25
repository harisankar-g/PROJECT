const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['debit_card', 'credit_card', 'cash_on_delivery', 'upi'],
    // uppercase: true  // Remove this line!
  },
  displayName: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    default: ''
  },
  processingFee: {
    type: Number,
    default: 0,
    min: 0
  },
  supportedBanks: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);