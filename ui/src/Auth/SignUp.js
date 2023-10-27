import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [region, setRegion] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        try {
            // const response = await axios.post('http://20.3.232.49:4400/api/v1/auth/register', {
            await axios.post('http://localhost:4400/api/v1/auth/register', {
                email,
                password,
                fullName,
                region,
            });
            alert("Registration successful!");
            navigate('/easypost-api/signin')
        } catch (err) {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                        placeholder="Password"
                        required
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="auth-input"
                        placeholder="Confirm Password"
                        required
                    />
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="auth-input"
                        placeholder="Enter your name or your company name"
                        required
                    />
                    <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="auth-input"
                        placeholder="Enter your region"
                        required
                    />
                    <button type="submit" className="auth-button">
                        Sign Up
                    </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/easypost-api/signin" className="auth-button">Sign In</Link>
            </div>
        </div>
    );
}

export default SignUp;
