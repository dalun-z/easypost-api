import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css'; // Import the CSS file

function SignIn() {
  const [email, setEmail] = useState('dalun.z@gmail.com');
  const [password, setPassword] = useState('1234');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // Add sign-in logic here
    if (email === 'dalun.z@gmail.com' && password === '1234') {
        navigate('/admin');
    } else {
        alert(`User doesn't exist`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
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
          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>
        <p>Don't have an account?</p>
        <Link to="/signup" className="auth-button">Sign Up</Link>
      </div>
    </div>
  );
}

export default SignIn;
