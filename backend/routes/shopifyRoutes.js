const express = require('express');
const { getNewArrivals, getProductDetails, addItemToCart, fetchCart, removeItemFromCart, processOrderWebhook, updateItemQuantity, getProductsByCollection } = require('../controllers/shopifyController');
const router = express.Router();
const verifyUserOrGuestToken = require('../middleware/verifyToken');

// Get new arrivals from Shopify
router.get('/newarrivals', getNewArrivals);

// Get product details by ID
router.get('/products/:productId', getProductDetails);

// Get products by collection
router.get('/collections/:collectionHandle', getProductsByCollection);

// Add item to cart
router.post('/cart/add',verifyUserOrGuestToken, addItemToCart);

// Fetch cart
router.get('/cart',verifyUserOrGuestToken, fetchCart);

// Remove item from cart
router.post('/cart/remove',verifyUserOrGuestToken, removeItemFromCart);

// Create checkout session
// router.post('/checkout',verifyUserOrGuestToken, createCheckoutSession);

// Process order webhook
// router.post('/webhooks/orders/create', processOrderWebhook);

// Update Quantity
router.post('/cart/update',verifyUserOrGuestToken, updateItemQuantity);

module.exports = router;

