// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Dashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { loading, error, apiCall } = useApi();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    preferences: [],
    rsvps: []
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchUserEvents();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const data = await apiCall('get', `/api/users/${userId}`);
      setUserInfo(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const data = await apiCall('get', '/api/events/user-events');
      setUpcomingEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelRSVP = async (eventId) => {
    try {
      await apiCall('post', `/api/events/cancel-rsvp/${eventId}`);
      fetchUserEvents();
      alert('RSVP cancelled successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <h2>Welcome, {userInfo.name}!</h2>
      {error && <div className="error-message">{error}</div>}
      
      <section className="user-info">
        <h3>Your Information</h3>
        <p>Email: {userInfo.email}</p>
        <p>Preferences: {userInfo.preferences.join(', ')}</p>
      </section>

      <section className="upcoming-events">
        <h3>Your Upcoming Events</h3>
        <div className="events-grid">
          {upcomingEvents.map(event => (
            <div key={event._id} className="event-card">
              <h4>{event.name}</h4>
              <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
              <p>Location: {event.location}</p>
              <button 
                onClick={() => cancelRSVP(event._id)}
                className="cancel-button"
              >
                Cancel RSVP
              </button>
            </div>
          ))}
        </div>
      </section>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;