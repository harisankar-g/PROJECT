import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <section className="page-content">
            <h2>Our Products</h2>
            
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                <div className="products-grid">
                    {products.map((p) => (
                        <div key={p._id} className="product-card">
                            <img 
                                src={p.product_image || `https://placehold.co/300x200?text=${p.product_name}`} 
                                alt={p.product_name} 
                                className="product-image"
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