import React from 'react';
import './Products.css';
const Services = () => {
  return (
    <section className="page-content">
      <h2>Our Services</h2>
      <div className="services-list">
        <div className="service-card">
          <h3>Sports Equipment Repair</h3>
          <p>warrenty products repair or replace a new.</p>
          <button>Book Now</button>
        </div>
        <div className="service-card">
          <h3>Sports Equipment Repair</h3>
          <p>warrenty products repair</p>
          <button>Book Now</button>
        </div>
      </div>
    </section>
  );
};

export default Services;