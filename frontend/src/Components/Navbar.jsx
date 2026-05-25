import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ phone: "", address: "" });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setEditData({ phone: parsed.phone || "", address: parsed.address || "" });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUpdate = async () => {
    try {
      const userId = user._id || user.id;
      await axios.put(`http://localhost:3000/api/users/${userId}`, editData);
      const updatedUser = { ...user, ...editData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/img/Cr7Sportslogo.jpeg" alt="Logo" />
        </Link>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">🔍</button>
      </form>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">🛒</Link>
        
        {user ? (
          <div className="profile-container">
            <button className="profile-btn" onClick={() => setShowShowProfile(!showProfile)}>
              👤 {user.name}
            </button>
            
            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <h3>My Profile</h3>
                  <button onClick={() => setShowShowProfile(false)}>✕</button>
                </div>
                
                <div className="profile-fields">
                  <div className="field">
                    <label>Name</label>
                    <span>{user.name}</span>
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <span>{user.email}</span>
                  </div>
                  <div className="field">
                    <label>Mobile</label>
                    {isEditing ? (
                      <input
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      />
                    ) : (
                      <span>{user.phone || "Not set"}</span>
                    )}
                  </div>
                  <div className="field">
                    <label>Address</label>
                    {isEditing ? (
                      <textarea
                        value={editData.address}
                        onChange={(e) => setEditData({...editData, address: e.target.value})}
                        rows="2"
                      />
                    ) : (
                      <span>{user.address || "Not set"}</span>
                    )}
                  </div>
                </div>
                
                <div className="profile-actions">
                  {isEditing ? (
                    <>
                      <button className="save-btn" onClick={handleUpdate}>Save</button>
                      <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                  ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>Update</button>
                  )}
                </div>
                
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;