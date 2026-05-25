import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cart';

export const getUserId = () => {
  try {
    const raw = localStorage.getItem('user');
    const user = raw ? JSON.parse(raw) : null;
    
    // NO ALERT - just console log
    if (!user) {
      console.log('No user found'); 
      return null;
    }
    
    const id = user._id || user.id || null;
    console.log('UserId:', id); 
    return id;
  } catch {
    return null;
  }
};

export const addToCart = async (product) => {
  const userId = getUserId();
  
  console.log('addToCart - userId:', userId); 
  
  if (!userId) {
    throw new Error('Please login first');
  }

  const response = await axios.post(`${API_URL}/add`, {
    userId: userId,
    productId: product._id,
    quantity: 1,
    price: product.product_price || product.price || 0
  });
  
  console.log('Added:', response.data);
  return response.data;
};

export const getCart = async () => {
  const userId = getUserId();
  
  if (!userId) {
    return null;
  }

  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};