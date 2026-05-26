import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from "../Components/Footer";
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products/all');
                setFeaturedProducts(response.data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProducts();

        // Play video for 10 seconds then stop
        if (videoRef.current) {
            videoRef.current.play().then(() => {
                setTimeout(() => {
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                }, 10000);
            }).catch(err => {
                console.log("Video autoplay blocked, showing fallback");
            });
        }
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleVideoLoaded = () => {
        setVideoLoaded(true);
    };

    return (
        <div className="home-page">
            {/* Hero Section with Video Background */}
            <section className="hero-section">
                {/* Video Element */}
                <video 
                    ref={videoRef}
                    className="hero-video" 
                    autoPlay 
                    muted 
                    playsInline
                    onLoadedData={handleVideoLoaded}
                >
                    <source src="/video/ronaldo.mp4" type="video/mp4" />
                </video>
                
                {/* Fallback Background Image if video fails */}
                <div className="hero-bg"></div>
                
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <span className="hero-tag">Sports & Fitness</span>
                    <h1>WELCOME TO <span className="highlight">CR7SPORTS</span></h1>
                    <p>Premium sports products at unbeatable prices</p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => navigate('/products')}>
                            Shop Now
                        </button>
                        <button className="btn-secondary" onClick={() => scrollToSection('about')}>
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="video-timer">Video plays for 10s</div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="section-container">
                    <div className="about-content">
                        <h2>About <span className="highlight">CR7Sports</span></h2>
                        <p>We are a leading sports retailer offering premium sports products at unbeatable prices. Founded in 2020, we've been serving thousands of happy customers worldwide.</p>
                        <div className="about-stats">
                            <div className="stat-item">
                                <span className="stat-number">5K+</span>
                                <span className="stat-label">Happy Customers</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">100+</span>
                                <span className="stat-label">Products</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Brands</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section id="products" className="products-section">
                <div className="section-container">
                    <h2>Featured <span className="highlight">Products</span></h2>
                    {loading ? (
                        <p className="loading-text">Loading products...</p>
                    ) : (
                        <div className="featured-products-grid">
                            {featuredProducts.map((product) => (
                                <div key={product._id} className="featured-product-card" onClick={() => navigate('/products')}>
                                    <div className="product-image-container">
                                        <img 
                                            src={product.product_image || "/img/Cr7Sportslogo.jpeg"} 
                                            alt={product.product_name}
                                        />
                                        <div className="product-badge">New</div>
                                    </div>
                                    <div className="product-details">
                                        <p className="product-brand">{product.product_brand}</p>
                                        <h3 className="product-name">{product.product_name}</h3>
                                        <p className="product-price">₹{product.product_price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="explore-more-container">
                        <button className="explore-more-btn" onClick={() => navigate('/products')}>
                            View All Products 
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services-section">
                <div className="section-container">
                    <h2>Our <span className="highlight">Services</span></h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">⚽</div>
                            <h3>Sports Equipment</h3>
                            <p>Best quality sports equipment</p>
                            <button className="service-btn">Learn More</button>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">🏋️</div>
                            <h3>Fitness Training</h3>
                            <p>Professional programs</p>
                            <button className="service-btn">Learn More</button>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">🔧</div>
                            <h3>Equipment Repair</h3>
                            <p>Quick services</p>
                            <button className="service-btn">Learn More</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="section-container">
                    <h2>Contact <span className="highlight">Us</span></h2>
                    <form className="contact-form">
                        <div className="form-row">
                            <input type="text" placeholder="Your Name" />
                            <input type="email" placeholder="Your Email" />
                        </div>
                        <textarea placeholder="Your Message"></textarea>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;