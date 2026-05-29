import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path) => navigate(path);
  const current = location.pathname;

  // Mock data - replace with API calls later
  const stats = {
    totalProducts: 156,
    lowStock: 12,
    totalOrders: 89,
    revenue: 45200
  };

  return (
    <section className="admin-dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p>Welcome back! Manage your store efficiently.</p>
          </div>
          <div className="header-right">
            <span className="admin-badge">Admin Panel</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-blue">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <span className="stat-label">Total Products</span>
              <span className="stat-value">{stats.totalProducts}</span>
            </div>
          </div>
          
          <div className="stat-card stat-red">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <span className="stat-label">Low Stock</span>
              <span className="stat-value">{stats.lowStock}</span>
            </div>
          </div>
          
          <div className="stat-card stat-green">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <span className="stat-label">Total Orders</span>
              <span className="stat-value">{stats.totalOrders}</span>
            </div>
          </div>
          
          <div className="stat-card stat-purple">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <span className="stat-label">Revenue</span>
              <span className="stat-value">₹{stats.revenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="main-grid">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <div className="sidebar-header">
              <h3>Navigation</h3>
            </div>
            
            <nav className="sidebar-nav">
              <button
                className={`nav-item ${current === "/admin" ? "active" : ""}`}
                onClick={() => go("/admin")}
              >
                <span className="nav-icon">📊</span>
                <span className="nav-text">Dashboard</span>
                <span className="nav-arrow">›</span>
              </button>
              
              <button
                className={`nav-item ${current === "/admin/products" ? "active" : ""}`}
                onClick={() => go("/admin/products")}
              >
                <span className="nav-icon">👕</span>
                <span className="nav-text">Products</span>
                <span className="nav-arrow">›</span>
              </button>
              
              <button
                className="nav-item"
                onClick={() => toast.info("Orders page coming soon!")}
              >
                <span className="nav-icon">📋</span>
                <span className="nav-text">Orders</span>
                <span className="nav-arrow">›</span>
              </button>
              
              <button
                className="nav-item"
                onClick={() => toast.info("Users page coming soon!")}
              >
                <span className="nav-icon">👥</span>
                <span className="nav-text">Users</span>
                <span className="nav-arrow">›</span>
              </button>
              
              <button
                className="nav-item"
                onClick={() => toast.info("Reports page coming soon!")}
              >
                <span className="nav-icon">📈</span>
                <span className="nav-text">Reports</span>
                <span className="nav-arrow">›</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="admin-main">
            <div className="main-header">
              <h2>Quick Actions</h2>
            </div>
            
            <div className="actions-grid">
              <div className="action-card action-products" onClick={() => go("/admin/products")}>
                <div className="action-icon">👕</div>
                <div className="action-content">
                  <h4>Products CRUD</h4>
                  <p>Add, edit, delete and manage products</p>
                </div>
                <button className="action-btn">Manage</button>
              </div>
              
              <div className="action-card action-orders">
                <div className="action-icon">📋</div>
                <div className="action-content">
                  <h4>Orders</h4>
                  <p>View and manage customer orders</p>
                </div>
                <button className="action-btn" onClick={() => toast.info("Coming soon")}>View</button>
              </div>
              
              <div className="action-card action-inventory">
                <div className="action-icon">📦</div>
                <div className="action-content">
                  <h4>Inventory</h4>
                  <p>Track stock levels and alerts</p>
                </div>
                <button className="action-btn" onClick={() => toast.info("Coming soon")}>Check</button>
              </div>
              
              <div className="action-card action-customers">
                <div className="action-icon">👥</div>
                <div className="action-content">
                  <h4>Customers</h4>
                  <p>Manage user accounts and roles</p>
                </div>
                <button className="action-btn" onClick={() => toast.info("Coming soon")}>Manage</button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">💡</div>
                <div className="info-content">
                  <h4>Tip of the Day</h4>
                  <p>Keep your product inventory updated for better sales!</p>
                </div>
              </div>
              
              <div className="info-card info-success">
                <div className="info-icon">✅</div>
                <div className="info-content">
                  <h4>System Status</h4>
                  <p>All systems running smoothly</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;