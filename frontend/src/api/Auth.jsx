import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

function Auth() { // Use function declaration instead of const
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
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

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', loginData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                toast.success("Login Successful!");
                setTimeout(() => { window.location.href = '/home'; }, 2000);
            } 
        } catch (err) {
            toast.error(err.response?.data?.msg || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (registerData.password !== registerData.conformpassword) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }
        try {
            await axios.post('http://localhost:3000/api/auth/register', registerData);
            toast.success("Registration Successful!");
            setIsLogin(true);
        } catch (err) {
            toast.error(err.response?.data?.msg || "Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-image-section">
                <div className="image-overlay">
                    <h1>{isLogin ? "Welcome Back" : "Join Us Today"}</h1>
                </div>
            </div>
            <div className="auth-form-section">
                <div className="form-wrapper">
                    <div className="tabs">
                        <button className={isLogin ? 'active-tab' : ''} onClick={() => setIsLogin(true)}>Login</button>
                        <button className={!isLogin ? 'active-tab' : ''} onClick={() => setIsLogin(false)}>Register</button>
                    </div>

                    {!isLogin ? (
                        <form onSubmit={handleRegisterSubmit}>
                            <input type="text" name="firstname" placeholder="First Name" onChange={handleRegisterChange} required />
                            <input type="text" name="lastname" placeholder="Last Name" onChange={handleRegisterChange} required />
                            <input type="email" name="email" placeholder="Email" onChange={handleRegisterChange} required />
                            <input type="password" name="password" placeholder="Password" onChange={handleRegisterChange} required />
                            <input type="password" name="conformpassword" placeholder="Confirm Password" onChange={handleRegisterChange} required />
                            <input type="text" name="address" placeholder="Address" onChange={handleRegisterChange} required />
                            <select name="gender" onChange={handleRegisterChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input type="text" name="phoneno" placeholder="Phone" onChange={handleRegisterChange} required />
                            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Sign Up'}</button>
                        </form>
                    ) : (
                        <form onSubmit={handleLoginSubmit}>
                            <input type="email" name="email" placeholder="Email" onChange={handleLoginChange} required />
                            <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} required />
                            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auth; // <--- IMPORTANT: Ensure this line exists