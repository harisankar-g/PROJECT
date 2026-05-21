import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../api/Auth.css'; // DELETE THIS LINE - We will import in App.jsx instead

function Login() {
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
                        <button className='active-tab'>Login</button>
                        <Link to="/register"><button>Register</button></Link>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="switch-mode">
                        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;