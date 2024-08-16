const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get the cart for a user by user ID
router.get('/:userId', cartController.getCartByUserId);

// Add an item to the cart
router.post('/:userId/add', cartController.addItemToCart);

// Remove an item from the cart
router.post('/:userId/remove', cartController.removeItemFromCart);

// Clear the cart
router.post('/:userId/clear', cartController.clearCart);

module.exports = router;
