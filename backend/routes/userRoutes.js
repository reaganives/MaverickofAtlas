const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// Get current user and their order history
// router.get('/me', verifyToken, getCurrentUser);

module.exports = router;




