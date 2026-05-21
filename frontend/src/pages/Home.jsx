import React from 'react';
import Footer from "../Components/Footer";

const Home = () => {
    return (
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
};

export default Home;