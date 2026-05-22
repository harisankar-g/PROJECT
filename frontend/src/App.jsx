import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify'; 
import Footer from './Components/Footer';

// Import Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Admincrud from './pages/Admincrud';

// CSS Files
import './App.css';
import './api/Auth.css'; // <--- ADD THIS LINE


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/services" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          
          <Route path="/products" element={<Products />} />
         <Route path="/admin" element={<Admincrud />} />

          
          {/* Separate Login & Register Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
      />
      
      <Footer /> 
    </BrowserRouter>
  );
}