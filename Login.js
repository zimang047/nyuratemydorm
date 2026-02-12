import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSignUp ? '/auth/signup' : '/auth/login';
      const response = await axios.post(`${API_URL}${endpoint}`, {
        username,
        password
      });

      // Store token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      onLogin(response.data.user, response.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🏠 NYU Dorm Ratings</h1>
          <p>Sign in to rate and review NYU residence halls</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              minLength={isSignUp ? 6 : undefined}
            />
            {isSignUp && (
              <small className="password-hint">Password must be at least 6 characters</small>
            )}
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              className="toggle-button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


