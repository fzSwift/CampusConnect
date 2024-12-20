// src/components/EditEvent.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Auth.css';

const EditEvent = () => {
  const { eventId } = useParams();
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

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const data = await apiCall('get', `/events/${eventId}`);
      setFormData({
        name: data.name,
        date: new Date(data.date).toISOString().split('T')[0],
        time: data.time,
        location: data.location,
        description: data.description,
        capacity: data.capacity
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await apiCall('put', `/events/${eventId}`, formData);
      alert('Event Updated Successfully');
      navigate('/events');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Edit Event</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Event Name"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={onChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={onChange}
          placeholder="Location"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={onChange}
          placeholder="Capacity"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Event'}
        </button>
      </form>
    </div>
  );
};

export default EditEvent;