const Event = require('../models/Event');
const User = require('../models/User');

exports.createEvent = async (req, res) => {
  const { name, date, time, location, description, capacity } = req.body;
  try {
    console.log('Creating new event:', req.body);
    const event = new Event({
      name,
      date,
      time,
      location,
      description,
      capacity,
      availableSeats: capacity,
      createdBy: req.user.id
    });
    await event.save();
    console.log('Event created successfully:', event);
    res.json(event);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    console.log('Fetching all events...');
    const events = await Event.find().sort({ date: 1 });
    console.log(`Found ${events.length} events`);
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    console.log('Updating event:', req.params.eventId);
    console.log('Update data:', req.body);
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      console.log('Event not found:', req.params.eventId);
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this event' });
    }

    Object.assign(event, req.body);
    await event.save();
    console.log('Event updated successfully:', event);
    res.json(event);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    console.log('Deleting event:', req.params.eventId);
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      console.log('Event not found:', req.params.eventId);
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    console.log('Event deleted successfully');
    res.json({ message: 'Event removed' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.rsvpEvent = async (req, res) => {
  try {
    console.log('Processing RSVP for event:', req.params.eventId);
    console.log('User:', req.user.id);

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      console.log('Event not found:', req.params.eventId);
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user has already RSVPed
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.rsvps.includes(event._id)) {
      return res.status(400).json({ message: 'Already RSVPed to this event' });
    }

    if (event.availableSeats === 0) {
      console.log('No available seats for event:', req.params.eventId);
      return res.status(400).json({ message: 'No available seats' });
    }

    event.availableSeats -= 1;
    await event.save();

    user.rsvps.push(event._id);
    await user.save();

    console.log('RSVP processed successfully');
    res.json({ 
      message: 'RSVP successful', 
      event,
      availableSeats: event.availableSeats 
    });
  } catch (err) {
    console.error('Error processing RSVP:', err);
    res.status(500).json({ 
      message: 'Error processing RSVP', 
      error: err.message 
    });
  }
};

exports.cancelRsvp = async (req, res) => {
  try {
    console.log('Canceling RSVP for event:', req.params.eventId);
    console.log('User:', req.body.userId);
    const event = await Event.findById(req.params.eventId);
    const user = await User.findById(req.body.userId);

    if (!event || !user) {
      console.log('Event or user not found');
      return res.status(404).json({ message: 'Event or user not found' });
    }

    event.availableSeats += 1;
    await event.save();

    user.rsvps = user.rsvps.filter(eventId => eventId.toString() !== req.params.eventId);
    await user.save();

    console.log('RSVP canceled successfully');
    res.json({ message: 'RSVP cancelled', event });
  } catch (err) {
    console.error('Error canceling RSVP:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
    console.log('Fetching events for user:', req.user.id);
    const events = await Event.find({
      createdBy: req.user.id
    }).sort({ date: 1 });
    console.log(`Found ${events.length} events for user`);
    res.json(events);
  } catch (err) {
    console.error('Error fetching user events:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getEventStats = async (req, res) => {
  try {
    console.log('Fetching event statistics...');
    
    const totalEvents = await Event.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: today }
    });
    
    const activeUsers = await User.countDocuments({
      $or: [
        { events: { $exists: true, $ne: [] } },
        { rsvps: { $exists: true, $ne: [] } }
      ]
    });

    const stats = {
      totalEvents,
      upcomingEvents,
      activeUsers
    };

    console.log('Statistics fetched successfully:', stats);
    res.json(stats);
  } catch (err) {
    console.error('Error fetching statistics:', err);
    res.status(500).json({ message: 'Error fetching statistics', error: err.message });
  }
};