import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  
  const handleScroll = (id) => {
    // If on home page, just scroll. If on different page, go home first then scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <img 
            src="/img/Cr7Sportslogo.jpeg" 
            alt="Logo" 
            className="logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" onClick={() => handleScroll('home')}>Home</Link>
        <Link to="/about" onClick={() => handleScroll('about')}>About</Link>
        <Link to="/products">Products</Link>
        <Link to="/services" onClick={() => handleScroll('services')}>Services</Link>
        <Link to="/contact" onClick={() => handleScroll('contact')}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;