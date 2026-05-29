// frontend/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:3000/api/auth/forgotpassword', { email });
            
            if (response.data.resetToken) {
                setToken(response.data.resetToken);
                setStep(2);
                toast.success("Token generated! Enter new password.");
            }
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to generate token");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await axios.post(`http://localhost:3000/api/auth/resetpassword/${token}`, {
                password: newPassword,
                confirmPassword: confirmPassword
            });
            
            if (response.data.msg === "Password Reset Successful") {
                toast.success("Password reset successful! Redirecting...");
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-image-section">
                <div className="image-overlay">
                    <h1>Reset Password</h1>
                    <p>{step === 1 ? "Enter your email" : "Set new password"}</p>
                </div>
            </div>
            
            <div className="auth-form-section">
                <div className="form-wrapper">
                    <div className="tabs">
                        <button className="active-tab">Reset Password</button>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleSubmitEmail}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Processing...' : 'Get Reset Token'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword}>
                            <div style={{ 
                                background: '#e3f2fd', 
                                padding: '12px', 
                                borderRadius: '8px', 
                                marginBottom: '15px',
                                fontSize: '13px',
                                color: '#1565c0'
                            }}>
                                <strong>Token:</strong><br/>
                                <code style={{ wordBreak: 'break-all' }}>{token}</code>
                            </div>
                            
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={() => { setStep(1); setToken(''); }}
                                style={{ 
                                    marginTop: '10px', 
                                    background: 'none', 
                                    border: 'none', 
                                    color: '#666', 
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                ← Back
                            </button>
                        </form>
                    )}

                    <div className="switch-mode">
                        <p>Remember password? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;