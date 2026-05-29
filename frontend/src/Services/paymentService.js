// frontend/Services/paymentService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/payment'; // Fixed: not payments

export const fetchPaymentMethods = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        // Return default if API fails
        return {
            success: true,
            data: [
                { _id: '1', name: 'cash_on_delivery', displayName: 'Cash on Delivery', description: 'Pay when order is delivered', processingFee: 0 },
                { _id: '2', name: 'upi', displayName: 'UPI', description: 'Pay via UPI app', processingFee: 0 }
            ]
        };
    }
};