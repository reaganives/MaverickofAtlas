const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// const isAuthenticated = require('../middleware/auth'); // Uncomment if you implement authentication

// Get all orders (for admin purposes or reporting)
router.get('/', orderController.getOrders);

// Get all orders for a specific user
router.get('/user/:userId', orderController.getOrderById);

// Get detailed order with shipping and payment data for a user
router.get('/user/:userId/details', orderController.getOrderDetails);

// Create a new order
router.post('/', orderController.createOrder);

// Update the status of an order
router.put('/:id', orderController.updateOrderStatus);

// Delete an order by ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

