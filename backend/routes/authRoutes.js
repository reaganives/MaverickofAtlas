const express = require('express');
const { login, register, sendPasswordReset, resetPassword, verifyEmail } = require('../controllers/authController');
const router = express.Router();

// Define the routes
router.post('/login', login);
router.post('/register', register);
router.post('/reset-password', sendPasswordReset);  // For requesting the password reset email
router.patch('/reset-password/:token', resetPassword);  // For resetting the password with the token
router.get('/verify-email/:token', verifyEmail);

module.exports = router;


