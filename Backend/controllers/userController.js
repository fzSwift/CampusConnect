const User = require('../models/User');

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, preferences } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, preferences }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};