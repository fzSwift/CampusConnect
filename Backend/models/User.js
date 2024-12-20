const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: [String],
  rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  attendedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  role: { type: String, default: 'user' } // 'user' or 'admin'
});

module.exports = mongoose.model('User', UserSchema);