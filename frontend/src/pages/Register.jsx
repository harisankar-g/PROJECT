import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Register() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [registerData, setRegisterData] = useState({
        firstname: '', lastname: '', email: '',
        password: '', conformpassword: '', address: '',
        gender: 'Male', phoneno: ''
    });

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (registerData.password !== registerData.conformpassword) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        if (registerData.password.length < 6) {
            toast.error("Password must be at least 6 characters!");
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/auth/register', registerData);
            toast.success("Registration Successful! Please Login.");
            window.location.href = '/login';
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
                    <h1>Join Us Today</h1>
                    <p>Create your account and get started.</p>
                </div>
            </div>
            <div className="auth-form-section">
                <div className="form-wrapper">
                    <div className="tabs">
                        <Link to="/login"><button>Login</button></Link>
                        <button className='active-tab'>Register</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} required />
                            <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} required />
                        </div>
                        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                        
                        {/* Password with Toggle */}
                        <div className="row password-row">
                            <div className="password-input-container">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    placeholder="Password" 
                                    onChange={handleChange} 
                                    required 
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            <div className="password-input-container">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="conformpassword" 
                                    placeholder="Confirm Password" 
                                    onChange={handleChange} 
                                    required 
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        
                        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                        <div className="row">
                            <select name="gender" onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input type="tel" name="phoneno" placeholder="Phone No" onChange={handleChange} required pattern="[0-9]{10}" />
                        </div>
                        
                        <button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="switch-mode">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;