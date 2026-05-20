import React from 'react';
import Contact from './ContactUs';
import About from './AboutUs';
import Services from './Services';
const Home = () => {
  return (
    <section className="page-content">
      <div className="hero-section">
        <h1>Welcome to MyStore</h1>
        <p>Best Products, Best Service, Best Deals</p>
        <button className="hero-btn">Shop Now</button>
      </div>
    </section>
  );
};

export default Home;