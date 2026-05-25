import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { fetchPaymentMethods } from '../Services/paymentService';
import { getUserId } from '../Services/cartService';
import axios from 'axios';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load payment methods
      const paymentData = await fetchPaymentMethods();
      setPaymentMethods(paymentData.data || []);
      
      // Load cart from backend
      const userId = getUserId();
      if (userId) {
        const cartResponse = await axios.get(`http://localhost:3000/api/cart/${userId}`);
        setCart(cartResponse.data);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const handleMethodSelect = (methodName) => {
    setSelectedMethod(methodName);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    try {
      setProcessing(true);
      
      const orderData = {
        userId: getUserId(),
        items: cart?.items || [],
        paymentMethod: selectedMethod,
        totalAmount: cart?.totalBill || 0
      };

      console.log('Processing payment:', orderData);
      
      // Replace alert with toast
      toast.success(`Payment initiated via ${selectedMethod}!`);
      
      // Clear cart after payment
      // await axios.delete(`http://localhost:3000/api/cart/clear/${getUserId()}`);
      
      setProcessing(false);
      
      // Redirect to success page
      setTimeout(() => {
        navigate('/products');
      }, 2000);
      
    } catch (err) {
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <section className="page-content payment-page">
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  const totalAmount = cart?.totalBill || 0;

  return (
    <section className="page-content payment-page">
      <h2>Select Payment Method</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {totalAmount > 0 && (
        <div className="order-summary">
          <p>Total Amount: <strong>₹{totalAmount}</strong></p>
        </div>
      )}
      
      <form onSubmit={handlePaymentSubmit} className="payment-form">
        <div className="payment-methods">
          {paymentMethods.length === 0 ? (
            <p className="no-methods">No payment methods available</p>
          ) : (
            paymentMethods.map((method) => (
              <div
                key={method._id}
                className={`payment-option ${selectedMethod === method.name ? 'selected' : ''}`}
                onClick={() => handleMethodSelect(method.name)}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.name}
                  checked={selectedMethod === method.name}
                  onChange={() => handleMethodSelect(method.name)}
                />
                <div className="method-details">
                  <h3>{method.displayName}</h3>
                  <p>{method.description}</p>
                  {method.processingFee > 0 && (
                    <span className="processing-fee">
                      Fee: {method.processingFee}%
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          type="submit" 
          className="submit-payment-btn"
          disabled={processing || !selectedMethod}
        >
          {processing ? 'Processing...' : `Pay ₹${totalAmount}`}
        </button>
      </form>
    </section>
  );
};

export default Payment;