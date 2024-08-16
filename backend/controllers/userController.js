const User = require('../models/User');
const Order = require('../models/Order');

// Get the current authenticated user and their order history
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = await Order.find({ user: userId });

    res.json({ user, orders });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCurrentUser,
}; 


