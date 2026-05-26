import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', loginData);
            
            if (response.data.msg === "Login successful" && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                toast.success("Login Successful!");
                
                // Check user role and redirect
                if (response.data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            }
        } catch (err) {
            const errorMsg = err.response?.data?.msg || "Login Failed";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-image-section">
                <div className="image-overlay">
                    <h1>Welcome Back</h1>
                    <p>Login to continue your journey.</p>
                </div>
            </div>
            
            <div className="auth-form-section">
                <div className="form-wrapper">
                    <div className="tabs">
                        <button className="active-tab">Login</button>
                        <Link to="/register">
                            <button>Register</button>
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="forgot-password">
                        <Link to="/forgotpassword">Forgot Password?</Link>
                    </div>

                    <div className="switch-mode">
                        <p>
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;