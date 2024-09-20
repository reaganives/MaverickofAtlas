const express = require('express');
const { login, logout, refreshToken, register, sendPasswordReset, resetPassword, verifyEmail, getCurrentUser, checkAuth, subscribeNewsletter } = require('../controllers/authController');
const router = express.Router();
const verifyUserOrGuestToken = require('../middleware/verifyToken');

// Define the routes
router.get('/me', verifyUserOrGuestToken, getCurrentUser);
router.get('/check-auth', checkAuth);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/register', register);
router.post('/reset-password', sendPasswordReset);  // For requesting the password reset email
router.patch('/reset-password/:token', resetPassword);  // For resetting the password with the token
router.get('/verify-email/:token', verifyEmail);
router.post('/subscribe', subscribeNewsletter);

module.exports = router;