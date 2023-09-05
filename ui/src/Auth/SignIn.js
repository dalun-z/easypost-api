import React, { useState } from 'react';
import '../css/Auth.css'; // Import the CSS file

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Add sign-in logic here
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <button type="submit" className="button">
            Sign In
          </button>
        </form>
        <p>Don't have an account?</p>
        <button
          onClick={() => console.log('Navigate to sign-up page')}
          className="button"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignIn;
