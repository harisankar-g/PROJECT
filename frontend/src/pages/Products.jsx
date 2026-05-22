import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');


    // Fetch products from backend - ADD CONSOLE LOG
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("Fetching products..."); // Debug
                const response = await axios.get('http://localhost:3000/api/products/all');
                console.log("Products:", response.data); // Debug
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                // Enhanced error logging
                console.error("Error:", error);
                console.error("Response:", error.response); // Check response
                toast.error(error.response?.data?.message || "Failed to load products");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="page-content"><h2>Loading products...</h2></div>;
    }

    const filteredProducts = products.filter((p) => {
        const size = (p.product_size ?? '').toString();
        const color = (p.product_color ?? '').toString();
        const qty = (p.product_quantity ?? '').toString();
        const warranty = (p.product_warranty ?? '').toString();
        const q = search.trim().toLowerCase();

        if (!q) return true;

        return [size, color, qty, warranty]
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
                    placeholder="Search by size, color, quantity, warranty..."
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
                                loading="lazy"
                            />

                            <div className="product-info">
                                <h3>{p.product_name}</h3>
                                <p className="brand">{p.product_brand}</p>
                                <p className="price">{p.product_price}</p>
                                
                                <div className="product-details">
                                    <span>Size: {p.product_size}</span>
                                    <span>Color: {p.product_color}</span>
                                    <span>Qty: {p.product_quantity}</span>
                                    <span>Warranty: {p.product_warranty}</span>
                                </div>

                                <div className="product-buttons" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                                    <button className="btn-add-cart">Add to Cart</button>
                                    <button className="btn-buy">Buy Now</button>
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