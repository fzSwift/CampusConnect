// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Home.css';

const Home = () => {
  const { isAuthenticated, apiCall } = useApi();
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall('get', '/api/events/stats');
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Unable to load platform statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Campus Connect</h1>
          <p className="hero-subtitle">Your one-stop platform for campus events and activities</p>
          {isAuthenticated ? (
            <Link to="/dashboard" className="cta-button">Go to Dashboard</Link>
          ) : (
            <Link to="/login" className="cta-button">Get Started</Link>
          )}
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Campus Connect?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="feature-icon calendar-icon">📅</i>
            <h3>Event Management</h3>
            <p>Create and manage events with ease. Track attendance and engage with participants.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon community-icon">👥</i>
            <h3>Community Building</h3>
            <p>Connect with fellow students and build lasting relationships through shared interests.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon notification-icon">🔔</i>
            <h3>Real-time Updates</h3>
            <p>Stay informed with instant notifications about events and activities.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon analytics-icon">📊</i>
            <h3>Analytics & Insights</h3>
            <p>Get valuable insights about event participation and engagement.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2>Platform Statistics</h2>
        {error ? (
          <div className="error-message">{error}</div>
        ) : loading ? (
          <div className="stats-loading">Loading statistics...</div>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.totalEvents}</h3>
              <p>Total Events</p>
            </div>
            <div className="stat-card">
              <h3>{stats.upcomingEvents}</h3>
              <p>Upcoming Events</p>
            </div>
            <div className="stat-card">
              <h3>{stats.activeUsers}</h3>
              <p>Active Users</p>
            </div>
          </div>
        )}
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join our community and start exploring campus events today!</p>
          {isAuthenticated ? (
            <div className="cta-buttons">
              <Link to="/dashboard" className="cta-button">View Dashboard</Link>
              <Link to="/events" className="cta-button secondary">Browse Events</Link>
            </div>
          ) : (
            <div className="cta-buttons">
              <Link to="/login" className="cta-button">Login Now</Link>
              <Link to="/events" className="cta-button secondary">Browse Events</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;