// frontend/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addToCart } from '../Services/cartService';
import { getUserId } from '../Services/cartService';
import './Products.css';

const Products = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const searchValue = searchParams.get('search');
        if (searchValue) setSearchQuery(searchValue);
        fetchProducts();
    }, [searchParams]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products/all');
            setProducts(response.data);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product);
            toast.success(`${product.product_name} added to cart!`);
            setTimeout(() => navigate('/cart'), 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed. Please login.');
        }
    };

    const handleBuyNow = async (product) => {
        try {
            const userId = getUserId();
            if (!userId) {
                toast.error('Please login first');
                navigate('/login');
                return;
            }

            const response = await axios.post('http://localhost:3000/api/cart/buynow', {
                userId,
                productId: product._id,
                quantity: 1,
                price: product.product_price
            });

            if (response.data.success) {
                navigate('/payment');
            }
        } catch (error) {
            toast.error('Failed. Please login.');
        }
    };

    // Search filter
    const filteredProducts = products.filter((p) => {
        if (!searchQuery.trim()) return true;
        
        const q = searchQuery.toLowerCase();
        
        return (
            (p.product_name?.toLowerCase() || '').includes(q) ||
            (p.product_brand?.toLowerCase() || '').includes(q) ||
            (p.product_size?.toLowerCase() || '').includes(q) ||
            (p.product_color?.toLowerCase() || '').includes(q) ||
            String(p.product_price).includes(q)
        );
    });

    if (loading) {
        return <div className="page-content"><h2>Loading products...</h2></div>;
    }

    return (
        <section className="page-content">
            <h2>Our Products</h2>

            {filteredProducts.length === 0 ? (
                <p className="no-products">No products found</p>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((p) => (
                        <div key={p._id} className="product-card">
                            <div className="product-image-wrapper">
                                <img 
                                    src={p.product_image || "/img/Cr7Sportslogo.jpeg"}
                                    alt={p.product_name}
                                    className="product-image"
                                />
                            </div>

                            <div className="product-info">
                                <h3>{p.product_name}</h3>
                                <p className="brand">{p.product_brand}</p>
                                <p className="price">₹{p.product_price}</p>
                                <p className="details">{p.product_size} | {p.product_color}</p>

                                <div className="product-buttons">
                                    <button 
                                        className="btn-add-cart" 
                                        onClick={() => handleAddToCart(p)}
                                    >
                                        Add to Cart
                                    </button>
                                    
                                    <button 
                                        className="btn-buy" 
                                        onClick={() => handleBuyNow(p)}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Products;