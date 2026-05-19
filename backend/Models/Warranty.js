
const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  duration: {
    type: String,
    required: true,
    enum: ['6 months', '1 year', '2 years', '3 years', 'Lifetime']
  },
  coverage: {
    type: String,
    enum: ['Manufacturing defects', 'Full coverage', 'Partial coverage']
  },
  terms: {
    type: String,
    default: 'Standard warranty terms apply'
  },
  price: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for fast queries
warrantySchema.index({ productId: 1, isActive: 1 });

module.exports = mongoose.model('Warranty', warrantySchema);