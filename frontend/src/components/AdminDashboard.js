import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { loading, error, apiCall } = useApi();
  const [stats, setStats] = useState({
    eventCount: 0,
    userCount: 0
  });
  const [adminInfo, setAdminInfo] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching admin dashboard data...');
      const userId = localStorage.getItem('userId');
      
      // Fetch events count
      const eventsRes = await apiCall('get', '/api/events');
      console.log('Events response:', eventsRes);
      
      // Fetch admin info
      const adminRes = await apiCall('get', `/api/users/${userId}`);
      console.log('Admin info response:', adminRes);
      
      setStats({
        eventCount: eventsRes.length,
        userCount: 0 // We'll implement this later
      });
      
      setAdminInfo({
        name: adminRes.name,
        email: adminRes.email
      });
    } catch (err) {
      console.error('Dashboard Error:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data
      });
    }
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard admin-dashboard">
      <h2>Admin Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      
      <section className="admin-info">
        <h3>Admin Information</h3>
        <p>Name: {adminInfo.name}</p>
        <p>Email: {adminInfo.email}</p>
      </section>

      <section className="stats">
        <h3>System Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Events</h4>
            <p>{stats.eventCount}</p>
          </div>
          <div className="stat-card">
            <h4>Total Users</h4>
            <p>{stats.userCount}</p>
          </div>
        </div>
      </section>

      <section className="actions">
        <button onClick={handleCreateEvent} className="create-button">
          Create New Event
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </section>
    </div>
  );
};

export default AdminDashboard;