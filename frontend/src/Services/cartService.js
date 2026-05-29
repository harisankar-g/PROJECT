// frontend/Services/cartService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cart';

// Get User ID from localStorage
export const getUserId = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?._id || user?.id || null;
    } catch {
        return null;
    }
};

// Fetch Cart by User ID
export const getCart = async () => {
    const userId = getUserId();
    if (!userId) {
        throw new Error('Please login first');
    }
    
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
};

// Add Product to Cart
export const addToCart = async (product) => {
    const userId = getUserId();
    
    if (!userId) {
        throw new Error('Please login first');
    }

    const response = await axios.post(`${API_URL}/add`, {
        userId: userId,
        productId: product._id,
        quantity: 1,
        price: product.product_price || product.price || 0
    });
    
    return response.data;
};

// Buy Single Product Now
export const buyNow = async (product) => {
    const userId = getUserId();
    
    if (!userId) {
        throw new Error('Please login first');
    }

    const response = await axios.post(`${API_URL}/buynow`, {
        userId: userId,
        productId: product._id,
        quantity: 1,
        price: product.product_price || product.price || 0
    });
    
    return response.data;
};

// Remove Single Item from Cart
export const removeFromCart = async (productId) => {
    const userId = getUserId();
    
    if (!userId) {
        throw new Error('Please login first');
    }

    const response = await axios.delete(`${API_URL}/${userId}/${productId}`);
    return response.data;
};

// Clear Entire Cart
export const clearCart = async () => {
    const userId = getUserId();
    
    if (!userId) {
        throw new Error('Please login first');
    }

    const response = await axios.delete(`${API_URL}/clear/${userId}`);
    return response.data;
};