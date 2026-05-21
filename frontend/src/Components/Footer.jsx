import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>My App</h3>
                    <p>Your trusted application for all your needs.</p>
                </div>
                
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: support@myapp.com</p>
                    <p>Phone: +123 456 7890</p>
                    <p>Address: 123 Main Street, City</p>
                </div>
                
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="https://facebook.com">Facebook</a>
                        <a href="https://twitter.com">Twitter</a>
                        <a href="https://instagram.com">Instagram</a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2024 My App. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;