const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get a specific payment by ID
router.get('/:orderId', paymentController.getPaymentByOrderId);

// Create a new payment
router.post('/', paymentController.createPayment);

// Update a payment status
router.put('/:id', paymentController.updatePaymentStatus);

// Delete a payment by ID
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
