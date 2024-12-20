import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './EventList.css';

const EventList = () => {
  const navigate = useNavigate();
  const { loading, error, apiCall, isAuthenticated } = useApi();
  const [events, setEvents] = useState([]);
  const [rsvpStatus, setRsvpStatus] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events...');
      const data = await apiCall('get', '/api/events');
      console.log('Events fetched:', data);
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleRSVP = async (eventId) => {
    if (!localStorage.getItem('userId')) {
      navigate('/login');
      return;
    }

    try {
      setRsvpStatus(prev => ({ ...prev, [eventId]: 'loading' }));
      const response = await apiCall('post', `/api/events/rsvp/${eventId}`);
      console.log('RSVP response:', response);
      
      // Update the event in the list with new available seats
      setEvents(events.map(event => 
        event._id === eventId 
          ? { ...event, availableSeats: response.availableSeats }
          : event
      ));
      
      setRsvpStatus(prev => ({ ...prev, [eventId]: 'success' }));
      setTimeout(() => {
        setRsvpStatus(prev => ({ ...prev, [eventId]: null }));
      }, 2000);
    } catch (err) {
      console.error('RSVP Error:', err);
      setRsvpStatus(prev => ({ ...prev, [eventId]: 'error' }));
      setTimeout(() => {
        setRsvpStatus(prev => ({ ...prev, [eventId]: null }));
      }, 3000);
    }
  };

  const getRsvpButtonText = (eventId, availableSeats) => {
    if (rsvpStatus[eventId] === 'loading') return 'Processing...';
    if (rsvpStatus[eventId] === 'success') return 'RSVP Successful!';
    if (rsvpStatus[eventId] === 'error') return 'RSVP Failed';
    if (availableSeats === 0) return 'Full';
    return 'RSVP';
  };

  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading events...</div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event._id} className="event-card">
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
              <p>Location: {event.location}</p>
              <p>Available Seats: {event.availableSeats}</p>
              <button 
                onClick={() => handleRSVP(event._id)}
                disabled={event.availableSeats === 0 || rsvpStatus[event._id] === 'loading'}
                className={`rsvp-button ${rsvpStatus[event._id] || ''}`}
              >
                {getRsvpButtonText(event._id, event.availableSeats)}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;