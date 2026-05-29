// backend/Controllers/paymentController.js
const PaymentMethod = require('../Models/paymentModel');

const DEFAULT_PAYMENTS = [
    { name: 'cash_on_delivery', displayName: 'Cash on Delivery', description: 'Pay when order is delivered at your door', processingFee: 0 },
    { name: 'upi', displayName: 'UPI', description: 'Pay instantly via UPI (GPay, PhonePe, Paytm)', processingFee: 0 },
    { name: 'debit_card', displayName: 'Debit Card', description: 'Pay with your debit card', processingFee: 0.5 },
    { name: 'credit_card', displayName: 'Credit Card', description: 'Pay with credit card & earn rewards', processingFee: 2.5 }
];

const getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find({ isActive: true }).sort({ displayName: 1 });
        res.status(200).json({ success: true, data: paymentMethods });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const initializePaymentMethods = async (req, res) => {
    try {
        const existingCount = await PaymentMethod.countDocuments();
        
        if (existingCount === 0) {
            await PaymentMethod.insertMany(DEFAULT_PAYMENTS);
            return res.status(201).json({ success: true, message: 'Payment methods initialized' });
        }
        
        return res.status(200).json({ success: true, message: 'Payment methods already exist' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Export for both routes and server init
const initialize = async () => {
    try {
        const existingCount = await PaymentMethod.countDocuments();
        if (existingCount === 0) {
            await PaymentMethod.insertMany(DEFAULT_PAYMENTS);
            console.log('✅ Payment methods initialized');
        } else {
            console.log('ℹ️ Payment methods already exist');
        }
    } catch (error) {
        console.error('❌ Payment init error:', error.message);
    }
};

module.exports = {
    getAllPaymentMethods,
    initializePaymentMethods,
    initializePaymentMethods: initialize  // For server.js
};