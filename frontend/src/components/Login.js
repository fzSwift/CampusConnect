import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, apiCall } = useApi();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await apiCall('post', '/api/auth/login', formData);
      console.log(response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      navigate(response.isAdmin ? '/admin-dashboard' : '/user-dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p>Don't have an account <Link to='/register'>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;