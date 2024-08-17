const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

// Get shipping details by order ID
router.get('/:_id', shippingController.getShippingById);

// Create shipping details for an order
router.post('/', shippingController.createShipping);

// Update shipping status
router.put('/:id', shippingController.updateShippingStatus);

// Delete a shipping record
router.delete('/:id', shippingController.deleteShipping);

module.exports = router;
