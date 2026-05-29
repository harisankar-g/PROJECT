// frontend/pages/Payment.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../Services/cartService';
import { fetchPaymentMethods } from '../Services/paymentService';
import axios from 'axios';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load payment methods
      const paymentData = await fetchPaymentMethods();
      setPaymentMethods(paymentData.data || []);
      
      // Check for single item order first
      const singleOrderData = localStorage.getItem('singleOrder');
      if (singleOrderData) {
        const parsedSingleOrder = JSON.parse(singleOrderData);
        setCart(parsedSingleOrder);
        localStorage.removeItem('singleOrder');
      } else {
        // Load full cart
        const userId = getUserId();
        if (userId) {
          try {
            const cartResponse = await axios.get(`http://localhost:3000/api/cart/${userId}`);
            setCart(cartResponse.data);
          } catch (err) {
            console.error('Cart error:', err);
          }
        }
      }
      
      setLoading(false);
    } catch (err) {
      console.error(err);
      setPaymentMethods([
        { _id: '1', name: 'cash_on_delivery', displayName: 'Cash on Delivery', description: 'Pay when order is delivered', processingFee: 0 },
        { _id: '2', name: 'upi', displayName: 'UPI', description: 'Pay via UPI', processingFee: 0 }
      ]);
      setLoading(false);
    }
  };

  const handleMethodSelect = (methodName) => {
    setSelectedMethod(methodName);
    setError('');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    try {
      setProcessing(true);
      setError('');

      const userId = getUserId();
      
      if (!userId) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }

      // Prepare items from cart
      const items = cart?.items?.map(item => ({
        productid: item.productid?._id || item.productid,
        quantity: item.quantity,
        price: item.price
      })) || [];

      if (items.length === 0) {
        setError('No items in cart');
        setProcessing(false);
        return;
      }

      console.log("📦 Creating order with items:", items);
      console.log("💰 Total amount:", cart?.totalBill);

      // Create order in backend (THIS WILL DECREASE STOCK)
      const orderRes = await axios.post('http://localhost:3000/api/orders/create', {
        userId,
        items: items,
        paymentMethod: selectedMethod,
        totalAmount: cart?.totalBill || 0,
        shippingAddress: ''
      });

      console.log("✅ Order created:", orderRes.data);

      // Show success message
      if (selectedMethod === 'cash_on_delivery') {
        toast.success('✅ Order placed! Pay ₹' + (cart?.totalBill || 0) + ' on delivery');
      } else if (selectedMethod === 'upi') {
        toast.info('UPI ID: cr7sports@okhdfcbank - Send and screenshot');
      }

      // Clear cart
      if (userId) {
        try {
          await axios.delete(`http://localhost:3000/api/cart/clear/${userId}`);
          console.log("🛒 Cart cleared");
        } catch (err) {
          console.error('Cart clear error:', err);
        }
      }
      
      setTimeout(() => {
        navigate('/products');
      }, 3000);
      
    } catch (err) {
      console.error("Order error:", err);
      setError(err.response?.data?.msg || err.message || 'Payment failed');
      toast.error('Order failed: ' + (err.response?.data?.msg || 'Try again'));
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <section className="page-content payment-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading payment options...</p>
        </div>
      </section>
    );
  }

  const totalAmount = cart?.totalBill || 0;

  return (
    <section className="page-content payment-page">
      <h2>💳 Select Payment Method</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {totalAmount > 0 && (
        <div className="order-summary">
          <p>Total Amount to Pay</p>
          <h3>₹{totalAmount}</h3>
        </div>
      )}
      
      <form onSubmit={handlePaymentSubmit}>
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <div
              key={method._id}
              className={`payment-option ${selectedMethod === method.name ? 'selected' : ''}`}
              onClick={() => handleMethodSelect(method.name)}
            >
              <div className="payment-radio">
                <div className={`radio-circle ${selectedMethod === method.name ? 'checked' : ''}`}>
                  {selectedMethod === method.name && <span>✓</span>}
                </div>
              </div>
              <div className="method-details">
                <h3>
                  {method.name === 'cash_on_delivery' && '💵 '}
                  {method.name === 'upi' && '📱 '}
                  {method.name.includes('card') && '💳 '}
                  {method.displayName}
                </h3>
                <p>{method.description}</p>
                {method.processingFee > 0 && (
                  <span className="processing-fee">+{method.processingFee}% fee</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button 
          type="submit" 
          className="submit-payment-btn"
          disabled={processing || !selectedMethod}
        >
          {processing ? 'Processing...' : `Pay ₹${totalAmount} →`}
        </button>
      </form>

      <button className="back-btn" onClick={() => navigate('/cart')}>
        ← Back to Cart
      </button>
    </section>
  );
};

export default Payment;