const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


// Add an item to the cart
router.post('/add', cartController.addItemToCart);  // POST request inherently adds an item

// Get the cart for a user by user ID
router.get('/:userId', cartController.getCartByUserId);

// Remove an item from the cart
router.delete('/:cartId/item/:itemId', cartController.removeItemFromCart);  // DELETE request for removing items

// Clear the cart
router.patch('/:userId/clear', cartController.clearCart);  // PATCH request for clearing the cart

router.put('/:cartId/item/:itemId/quantity', cartController.updateItemQuantity); // PUT request for updating the quantity of an item in the cart

module.exports = router;