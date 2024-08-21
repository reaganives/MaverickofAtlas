const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require('../models/Order');

// Get the current authenticated user and their order history
const getCurrentUser = async (req, res) => {
  try {
    // Get the access token from the cookies
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Find the user by the id in the decoded token
    const userId = decoded.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the user's orders
    const orders = await Order.find({ user: userId });

    res.json({ user, orders });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCurrentUser,
};

