const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review for a hotel
router.post('/hotels/:hotelId/reviews', reviewController.createReview);

// Update a review for a hotel
router.put('/reviews/:reviewId', reviewController.updateReview);

// Delete a review for a hotel
router.delete('/reviews/:reviewId', reviewController.deleteReview);

module.exports = router;
