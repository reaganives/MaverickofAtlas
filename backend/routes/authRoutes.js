const express = require('express');
const { login, register } = require('../controllers/authController');  // Import both functions
const router = express.Router();

// Define the routes
router.post('/login', login);
router.post('/register', register);

module.exports = router;

