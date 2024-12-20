import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { loading, error, apiCall } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    preferences: []
  });

  const onChange = e => {
    if (e.target.name === 'preferences') {
      const value = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, preferences: value }));
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await apiCall('post', '/api/auth/register', formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Full Name"
          required
        />
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
        <select
          name="preferences"
          multiple
          value={formData.preferences}
          onChange={onChange}
        >
          <option value="workshop">Workshops</option>
          <option value="seminar">Seminars</option>
          <option value="conference">Conferences</option>
          <option value="social">Social Events</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;