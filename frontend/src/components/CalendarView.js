import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import { useApi } from '../hooks/useApi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { loading, error, apiCall } = useApi();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events for calendar...');
      const data = await apiCall('get', '/api/events');
      console.log('Received events:', data);
      const formattedEvents = data.map(event => ({
        ...event,
        start: new Date(event.date),
        end: new Date(event.date),
      }));
      setEvents(formattedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleSelectEvent = event => {
    setSelectedDate(new Date(event.start));
    setSelectedDateEvents(events.filter(e => 
      new Date(e.date).toDateString() === new Date(event.start).toDateString()
    ));
  };

  const handleSelectSlot = slotInfo => {
    setSelectedDate(slotInfo.start);
    setSelectedDateEvents(events.filter(e => 
      new Date(e.date).toDateString() === slotInfo.start.toDateString()
    ));
  };

  if (loading) return <div className="loading">Loading calendar...</div>;

  return (
    <div className="calendar-view">
      <h1>Event Calendar</h1>
      {error && <div className="error-message">{error}</div>}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
      <div className="selected-date-events">
        <h2>Events on {selectedDate.toDateString()}</h2>
        {selectedDateEvents.length > 0 ? (
          <ul>
            {selectedDateEvents.map(event => (
              <li key={event._id} className="event-card">
                <h3>{event.name}</h3>
                <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                <p>Location: {event.location}</p>
                <p>{event.description}</p>
                <p>Available Seats: {event.availableSeats}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events on this day</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;