const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

// Get the cart for a user by user ID
router.get('/', verifyToken, cartController.getCart);

// Add an item to the cart
router.post('/add', verifyToken, cartController.addItemToCart);  // POST request inherently adds an item

// Remove an item from the cart
router.delete('/:cartId/item/:itemId', verifyToken, cartController.removeItemFromCart);  // DELETE request for removing items

// Clear the cart
router.patch('/:userId/clear', verifyToken, cartController.clearCart);  // PATCH request for clearing the cart

router.put('/:cartId/item/:itemId/quantity', verifyToken, cartController.updateItemQuantity); // PUT request for updating the quantity of an item in the cart

module.exports = router;