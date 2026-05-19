// controllers/paymentController.js
const PaymentMethod = require('../Models/paymentModel');

// Predefined payment methods data
const DEFAULT_PAYMENTS = [
  {
    name: 'debit_card',
    displayName: 'Debit Card',
    description: 'Pay securely with your debit card',
    processingFee: 0.5,
    supportedBanks: ['HDFC', 'SBI', 'ICICI']
  },
  {
    name: 'credit_card',
    displayName: 'Credit Card',
    description: 'Pay with credit card & earn rewards',
    processingFee: 2.5,
    supportedBanks: ['HDFC', 'SBI', 'ICICI', 'AXIS']
  },
  {
    name: 'cash_on_delivery',
    displayName: 'Cash on Delivery',
    description: 'Pay cash when your order is delivered',
    processingFee: 0,
    supportedBanks: []
  },
  {
    name: 'upi',
    displayName: 'UPI',
    description: 'Instant payment via PhonePe, GPay, Paytm',
    processingFee: 0,
    supportedBanks: ['All UPI Banks']
  }
];

// Get all active payment methods
const getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ isActive: true })
      .sort({ displayName: 1 })
      .select('-__v');
    
    res.status(200).json({
      success: true,
      count: paymentMethods.length,
      data: paymentMethods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment methods',
      error: error.message
    });
  }
};

// Get single payment method
const getPaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentMethod = await PaymentMethod.findById(id).select('-__v');
    
    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: paymentMethod
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Initialize default payment methods (run once)
const initializePaymentMethods = async (req, res) => {
  try {
    const existingCount = await PaymentMethod.countDocuments();
    
    if (existingCount === 0) {
      await PaymentMethod.insertMany(DEFAULT_PAYMENTS);
      
      res.status(201).json({
        success: true,
        message: 'Default payment methods initialized successfully',
        count: DEFAULT_PAYMENTS.length
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Payment methods already exist',
        existingCount
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Initialization failed',
      error: error.message
    });
  }
};

// Toggle payment method status
const togglePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    
    const paymentMethod = await PaymentMethod.findById(id);
    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found'
      });
    }
    
    paymentMethod.isActive = !paymentMethod.isActive;
    paymentMethod.updatedAt = Date.now();
    await paymentMethod.save();
    
    res.status(200).json({
      success: true,
      data: paymentMethod,
      message: `Payment method ${paymentMethod.isActive ? 'activated' : 'deactivated'}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to toggle payment method',
      error: error.message
    });
  }
};

module.exports = {
  getAllPaymentMethods,
  getPaymentMethod,
  initializePaymentMethods,
  togglePaymentMethod
};