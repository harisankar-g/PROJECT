import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Login State
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    // Register State
    const [registerData, setRegisterData] = useState({
        firstname: '', lastname: '', email: '',
        password: '', conformpassword: '', address: '',
        gender: 'Male', phoneno: ''
    });

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    // --- LOGIN SUBMIT (UPDATED) ---
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', loginData);
            
            if (response.data.token) {
                // Save token and user to localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                alert("Login Successful!");
                
                // Redirect to home
                window.location.href = '/home';
            } else {
                setError("Login failed");
            }
        } catch (err) {
            setError(err.response?.data?.msg || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (registerData.password !== registerData.conformpassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', registerData);
            alert("Registration Successful! Please Login.");
            setIsLogin(true);
        } catch (err) {
            setError(err.response?.data?.msg || "Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {/* Left Side - Image */}
            <div className="auth-image-section">
                <div className="image-overlay">
                    <h1>{isLogin ? "Welcome Back" : "Join Us Today"}</h1>
                    <p>{isLogin ? "Login to continue your journey." : "Create your account and get started."}</p>
                </div>
            </div>

            {/* Right Side - Forms */}
            <div className="auth-form-section">
                <div className="form-wrapper">
                    <div className="tabs">
                        <button className={isLogin ? 'active-tab' : ''} onClick={() => { setIsLogin(true); setError(''); }}>Login</button>
                        <button className={!isLogin ? 'active-tab' : ''} onClick={() => { setIsLogin(false); setError(''); }}>Register</button>
                    </div>

                    {error && <div className="error-banner">{error}</div>}

                    {!isLogin ? (
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="row">
                                <input type="text" name="firstname" placeholder="First Name" onChange={handleRegisterChange} required />
                                <input type="text" name="lastname" placeholder="Last Name" onChange={handleRegisterChange} required />
                            </div>
                            <input type="email" name="email" placeholder="Email Address" onChange={handleRegisterChange} required />
                            <div className="row">
                                <input type="password" name="password" placeholder="Password" onChange={handleRegisterChange} required />
                                <input type="password" name="conformpassword" placeholder="Confirm Password" onChange={handleRegisterChange} required />
                            </div>
                            <input type="text" name="address" placeholder="Address" onChange={handleRegisterChange} required />
                            <div className="row">
                                <select name="gender" onChange={handleRegisterChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input type="text" name="phoneno" placeholder="Phone No" onChange={handleRegisterChange} required />
                            </div>
                            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Sign Up'}</button>
                        </form>
                    ) : (
                        <form onSubmit={handleLoginSubmit}>
                            <input type="email" name="email" placeholder="Email Address" onChange={handleLoginChange} required />
                            <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} required />
                            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                        </form>
                    )}

                    <div className="switch-mode">
                        {isLogin ? <p>Don't have an account? <Link to="/register">Sign Up</Link></p> : <p>Already have an account? <Link to="/login">Login</Link></p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;