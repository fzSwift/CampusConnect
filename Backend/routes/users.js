const express = require('express');
const auth = require('../middleware/auth');
const { getUserById, updateUser } = require('../controllers/userController');
const router = express.Router();

router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);

module.exports = router;