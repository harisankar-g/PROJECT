import React from 'react';

const Services = () => {
  return (
    <section className="page-content">
      <h2>Our Services</h2>
      <div className="services-list">
        <div className="service-card">
          <h3>Phone Repair</h3>
          <p>Screen replacement & battery change.</p>
          <button>Book Now</button>
        </div>
        <div className="service-card">
          <h3>Laptop Repair</h3>
          <p>Software & hardware solutions.</p>
          <button>Book Now</button>
        </div>
      </div>
    </section>
  );
};

export default Services;