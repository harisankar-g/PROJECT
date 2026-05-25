const PaymentMethod = require('../Models/paymentModel');

const DEFAULT_PAYMENTS = [
  { name: 'debit_card', displayName: 'Debit Card', description: 'Pay securely with your debit card', processingFee: 0.5, supportedBanks: ['HDFC', 'SBI', 'ICICI'] },
  { name: 'credit_card', displayName: 'Credit Card', description: 'Pay with credit card & earn rewards', processingFee: 2.5, supportedBanks: ['HDFC', 'SBI', 'ICICI', 'AXIS'] },
  { name: 'cash_on_delivery', displayName: 'Cash on Delivery', description: 'Pay cash when your order is delivered', processingFee: 0, supportedBanks: [] },
  { name: 'upi', displayName: 'UPI', description: 'Instant payment via PhonePe, GPay, Paytm', processingFee: 0, supportedBanks: ['All UPI Banks'] }
];

const getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find({ isActive: true }).sort({ displayName: 1 }).select('-__v');
        res.status(200).json({ success: true, count: paymentMethods.length, data: paymentMethods });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch payment methods', error: error.message });
    }
};

const initializePaymentMethods = async (req, res) => {
    try {
        const existingCount = await PaymentMethod.countDocuments();
        if (existingCount === 0) {
            await PaymentMethod.insertMany(DEFAULT_PAYMENTS);
            res.status(201).json({ success: true, message: 'Default payment methods initialized', count: DEFAULT_PAYMENTS.length });
        } else {
            res.status(200).json({ success: true, message: 'Payment methods already exist', existingCount });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Initialization failed', error: error.message });
    }
};

module.exports = {
    getAllPaymentMethods,
    initializePaymentMethods
};