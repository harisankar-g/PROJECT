import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../Services/cartService';
import './cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = getUserId();
  console.log('Cart page userId:', userId);

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${userId}/${productId}`);
      toast.success('Removed');
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove');
    }
  };

  // NEW FUNCTION: Buy single product
  const buySingleItem = (item) => {
    // Store single item details in localStorage or state
    // You can also pass this via navigate state
    const singleOrder = {
      items: [{
        productid: item.productid,
        quantity: item.quantity,
        price: item.price
      }],
      totalBill: item.price * item.quantity,
      isSingleItem: true // Flag to identify single purchase
    };
    
    // Save to localStorage to access in Payment page
    localStorage.setItem('singleOrder', JSON.stringify(singleOrder));
    
    navigate('/payment');
  };

  if (loading) {
    return (
      <section className="page-content">
        <div className="loading">Loading cart...</div>
      </section>
    );
  }

  const items = cart?.items || [];

  return (
    <section className="page-content cart-page">
      <h2>Your Cart</h2>

      {!userId ? (
        <div className="login-prompt">
          <p>Please login to view your cart.</p>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/products')}>Shop Now</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item, idx) => (
              <div key={idx} className="cart-card">
                <div className="cart-card-image">
                  <img 
                    src={item.productid?.product_image || '/img/Cr7Sportslogo.jpeg'} 
                    alt={item.productid?.product_name}
                  />
                </div>
                
                <div className="cart-card-details">
                  <h3>{item.productid?.product_name || 'Product'}</h3>
                  <p className="brand">{item.productid?.product_brand || ''}</p>
                  <div className="product-info-row">
                    <span>Size: {item.productid?.product_size || 'N/A'}</span>
                    <span>Color: {item.productid?.product_color || 'N/A'}</span>
                  </div>
                  <p className="price">₹{item.price}</p>
                </div>
                
                <div className="cart-card-actions">
                  <div className="quantity">
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <div className="item-total">
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                  
                  {/* NEW BUTTON: Buy Single Item */}
                  <button 
                    className="btn-buy-now"
                    onClick={() => buySingleItem(item)}
                  >
                    Buy Now
                  </button>
                  
                  <button 
                    className="btn-remove"
                    onClick={() => removeItem(item.productid._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cart?.totalBill || 0}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{cart?.totalBill || 0}</span>
            </div>
            
            <button 
              className="btn-checkout"
              onClick={() => {
                // Clear single order if exists
                localStorage.removeItem('singleOrder');
                navigate('/payment');
              }}
            >
              Proceed to Checkout (All Items)
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;