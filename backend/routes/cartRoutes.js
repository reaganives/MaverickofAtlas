const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get the cart for a user by user ID
router.get('/:userId', cartController.getCartByUserId);

// Add an item to the cart
router.post('/:userId', cartController.addItemToCart);  // POST request inherently adds an item

// Remove an item from the cart
router.delete('/:cartId/item/:itemId', cartController.deleteItem);  // DELETE request for removing items

// Clear the cart
router.patch('/:userId/clear', cartController.clearCart);  // PATCH request for clearing the cart

module.exports = router;