import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load products");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // If loading, show message
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
                            {/* Image from external source - using placeholder or external URL */}
                            <img 
                                src={p.product_image || `https://placehold.co/300x200?text=${p.product_name}`} 
                                alt={p.product_name} 
                                className="product-image"
                            />
                            
                            <div className="product-info">
                                <h3>{p.product_name}</h3>
                                <p className="brand">{p.product_brand}</p>
                                <p className="price">${p.product_price}</p>
                                
                                <div className="product-details">
                                    <span>Size: {p.product_size}</span>
                                    <span>Color: {p.product_color}</span>
                                    <span>Qty: {p.product_quantity}</span>
                                    <span>Warranty: {p.product_warranty}</span>
                                </div>
                                
                                <div className="product-buttons">
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