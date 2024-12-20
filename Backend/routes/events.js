const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  createEvent, 
  getEvents, 
  updateEvent, 
  deleteEvent, 
  rsvpEvent, 
  cancelRsvp,
  getUserEvents,
  getEventStats 
} = require('../controllers/eventController');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Events route is working!' });
});

// Public routes
router.get('/', getEvents);

// Protected routes
router.post('/', auth, createEvent);
router.put('/:eventId', auth, updateEvent);
router.delete('/:eventId', auth, deleteEvent);
router.post('/rsvp/:eventId', auth, rsvpEvent);
router.post('/cancel-rsvp/:eventId', auth, cancelRsvp);
router.get('/user-events', auth, getUserEvents);
router.get('/stats', getEventStats);

module.exports = router;