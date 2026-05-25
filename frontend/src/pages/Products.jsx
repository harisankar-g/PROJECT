import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../Services/cartService';

import './Products.css';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products/all');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to load products");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = async (product) => {
        try {
            const result = await addToCart(product);
            console.log('Added result:', result); // DEBUG
            
            toast.success(`${product.product_name} added to cart!`);
            
            // Auto-redirect to Cart page
            setTimeout(() => {
                navigate('/cart');
            }, 1000);
            
        } catch (error) {
            console.error("Full error:", error);
            console.error("Response:", error.response);
            toast.error(error.response?.data?.message || 'Failed to add. Please login.');
        }
    };

    if (loading) {
        return <div className="page-content"><h2>Loading products...</h2></div>;
    }

    const filteredProducts = products.filter((p) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;

        const name = (p.product_name ?? '').toString();
        const brand = (p.product_brand ?? '').toString();
        const price = (p.product_price ?? '').toString();
        const size = (p.product_size ?? '').toString();
        const color = (p.product_color ?? '').toString();

        return [name, brand, price, size, color]
            .join(' ')
            .toLowerCase()
            .includes(q);
    });

    return (
        <section className="page-content">
            <h2>Our Products</h2>

            <div className="products-search">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredProducts.length === 0 ? (
                <p>No products available</p>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((p) => (
                        <div key={p._id} className="product-card">
                            <img 
                                src={p.product_image || "/img/Cr7Sportslogo.jpeg"}
                                alt={p.product_name}
                                className="product-image"
                            />

                            <div className="product-info">
                                <h3>{p.product_name}</h3>
                                <p className="brand">{p.product_brand}</p>
                                <p className="price">{p.product_price}</p>
                                
                                <div className="product-buttons">
                                    <button 
                                        className="btn-add-cart" 
                                        onClick={() => handleAddToCart(p)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button className="btn-buy" onClick={() => navigate('/payment')}>
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