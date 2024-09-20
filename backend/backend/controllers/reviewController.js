const Review = require('../models/Review');

// Get all reviews for an item
exports.getReviewsByItemId = async (req, res) => {
  try {
    const reviews = await Review.find({ item: req.params.itemId }).populate('user');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  const { user, item, rating, comment } = req.body;
  try {
    const review = new Review({ user, item, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
