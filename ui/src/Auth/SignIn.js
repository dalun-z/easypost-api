import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Auth.css'; 

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://20.3.232.49:4400/api/v1/auth/login', {
        email,
        password,
      });
      console.log('Response: ' + response)

      const { user, token } = response.data;
      console.log('User: ' + user)

      localStorage.setItem('token', token);
      
      if (user.role === 'admin') {
        navigate('/easypost-api/admin');
      } else {
        navigate('easypost-api/user');
      }
      
      // can also store user information in the app's state if needed
      // setUser(user);
    } catch (err) {
      alert(`User doesn't exist or incorrect credentials`);
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
        <Link to="/easypost-api/signup" className="auth-button">Sign Up</Link>
      </div>
    </div>
  );
}

export default SignIn;
