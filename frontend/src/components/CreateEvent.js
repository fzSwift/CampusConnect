// src/components/CreateEvent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Auth.css';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { loading, error, apiCall } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    capacity: ''
  });

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      console.log('Creating event with data:', formData);
      await apiCall('post', '/api/events', formData);
      console.log('Event created successfully');
      alert('Event Created Successfully');
      navigate('/events');
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Event</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={formData.name} 
            onChange={onChange} 
            placeholder="Event Name" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            id="date"
            name="date" 
            value={formData.date} 
            onChange={onChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input 
            type="time" 
            id="time"
            name="time" 
            value={formData.time} 
            onChange={onChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input 
            type="text" 
            id="location"
            name="location" 
            value={formData.location} 
            onChange={onChange} 
            placeholder="Location" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description"
            name="description" 
            value={formData.description} 
            onChange={onChange} 
            placeholder="Description" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input 
            type="number" 
            id="capacity"
            name="capacity" 
            value={formData.capacity} 
            onChange={onChange} 
            placeholder="Capacity" 
            min="1"
            required 
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;