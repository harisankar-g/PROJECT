import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Auth from './Components/Auth';


import './App.css';

// ========================
// ALL SECTIONS ON ONE PAGE (Home, About, Services, Contact)
// ========================

const SinglePage = () => (
  <>
    {/* Home Section with Background */}
    <section id="home" className="home-background">
      <div className="home-content">
        <h1>WELCOME TO CR7SPORTS</h1>
        <p>Best Products & Services</p>
        <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
          Explore Now
        </button>
      </div>
    </section>

    {/* About Section */}
    <section id="about" className="section">
      <h2>About Us</h2>
      <p>We are a leading sports retailer offering premium sports products at unbeatable prices.</p>
      <p>Founded in 2020, serving thousands of happy customers worldwide.</p>
    </section>

    {/* Services Section */}
    <section id="services" className="section">
      <h2>Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <h3>Sports Equipment</h3>
          <p>Best quality sports equipment</p>
          <button>Learn More</button>
        </div>
        <div className="service-card">
          <h3>Fitness Training</h3>
          <p>Professional training programs</p>
          <button>Learn More</button>
        </div>
        <div className="service-card">
          <h3>Equipment Repair</h3>
          <p>Quick repair services</p>
          <button>Learn More</button>
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="section">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </>
);

// ========================
// Products PAGE (Separate)
// ========================

const Products = () => {
  const products = [
    { id: 1, name: 'Football', price: 25, brand: 'Nike' },
    { id: 2, name: 'Basketball', price: 30, brand: 'Adidas' },
    { id: 3, name: 'Tennis Racket', price: 45, brand: 'Wilson' },
  ];

  return (
    <section id="products" className="section">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="brand">{product.brand}</p>
            <p className="price">${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

// ========================
// Main App
// ========================

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {/* Home/About/Services/Contact - ALL IN ONE PAGE */}
          <Route path="/" element={<SinglePage />} />
          <Route path="/about" element={<SinglePage />} />
          <Route path="/services" element={<SinglePage />} />
          <Route path="/contact" element={<SinglePage />} />
          
          {/* Products - SEPARATE PAGE */}
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}