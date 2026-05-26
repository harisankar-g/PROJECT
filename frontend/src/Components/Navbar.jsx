// frontend/src/Components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ phone: "", address: "" });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setEditData({ phone: parsed.phone || "", address: parsed.address || "" });
    }
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsProfileOpen(false);
    navigate('/login');
  };

  const handleUpdate = async () => {
    try {
      const userId = user._id || user.id;
      
      const response = await axios.put(`http://localhost:3000/api/users/${userId}`, {
        phone: editData.phone,
        address: editData.address
      });

      console.log("Update Response:", response.data);

      const updatedUser = { ...user, ...editData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);

      setMessage("Profile updated successfully!");
      setMessageType("success");
    } catch (err) {
      console.error("Error:", err.response?.data);
      setMessage(err.response?.data?.msg || "Failed to update profile.");
      setMessageType("error");
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/img/Cr7Sportslogo.jpeg" alt="Logo" />
        </Link>
      </div>

      {/* Search Form */}
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </form>

      {/* Links */}
      <div className="nav-links">
        {user?.role === 'admin' && (
          <Link to="/admin" className="nav-link admin-link">Admin Panel</Link>
        )}

        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/cart" className="cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </Link>

        {user ? (
          <div
            className="profile-container"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <button className="profile-trigger">
              <div className="profile-avatar">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="profile-name">{user.name}</span>
            </button>

            {isProfileOpen && (
              <div className="profile-dropdown">
                {message && (
                  <div className={`alert-message ${messageType}`}>
                    {messageType === 'success' ? '✓ ' : '✕ '}
                    {message}
                  </div>
                )}

                <div className="dropdown-top">
                  <div className="user-info">
                    <div className="user-avatar-large">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-details">
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="dropdown-content">
                  <div className="info-row">
                    <div className="info-box">
                      <span className="info-label">Phone</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          placeholder="Add phone number"
                        />
                      ) : (
                        <span className="info-value">{user.phone || "Not added"}</span>
                      )}
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-box">
                      <span className="info-label">Address</span>
                      {isEditing ? (
                        <textarea
                          value={editData.address}
                          onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                          rows="2"
                          placeholder="Add address"
                        />
                      ) : (
                        <span className="info-value">{user.address || "Not added"}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="dropdown-actions">
                  {isEditing ? (
                    <>
                      <button className="btn-save" onClick={handleUpdate}>Save Changes</button>
                      <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                  ) : (
                    <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
                  )}
                  <button className="btn-logout" onClick={handleLogout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;