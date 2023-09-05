import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import useHistory from react-router-dom
import '../css/Auth.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        // Add sign-up logic here
        // After successful sign-up, you can navigate to another page, e.g., the dashboard

        if (password === confirmPassword) {
            // Passwords match, proceed with sign-up
        } else {
            // Passwords do not match, handle error or display a message
            alert("Passwords do not match. Please try again.");
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
                        placeholder="Confirm Password" // Add "Confirm Password" input
                        required
                    />
                    <button type="submit" className="auth-button">
                        Sign Up
                    </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/signin" className="auth-button">Sign In</Link>
            </div>
        </div>
    );
}

export default SignUp;
