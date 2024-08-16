const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Get all reviews for an item
router.get('/item/:itemId', reviewController.getReviewsByItemId);

// Create a new review
router.post('/', reviewController.createReview);

// Update a review by ID
router.put('/:id', reviewController.updateReview);

// Delete a review by ID
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
