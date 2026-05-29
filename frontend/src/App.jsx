import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify'; 
import Footer from './Components/Footer';

// IMPORT THE NEW COMPONENT HERE

import ProtectedRoute from './Components/ProtectedRoute.jsx';

import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Admincrud from './pages/Admincrud';
import AdminDashboard from './pages/AdminDashboard';

import Cart from './pages/Cart';
import Payment from './pages/Payment';

import './App.css';
import './api/Auth.css';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const hideOn = ['/login', '/register', '/forgotpassword'];
  const shouldShow = !hideOn.includes(location.pathname);

  return (
    <>
      {shouldShow && <Navbar />}
      {children}
      {shouldShow && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <Router>
      <PageWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/services" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />



          {/* Protected Routes Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
          
          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<Admincrud />} />
          </Route>


          
        </Routes>
      </PageWrapper>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}