
const Hotel = require('../models/hotel');
const Review = require('../models/review');

// Rest of the code...


// Create a new review for a hotel
const createReview = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { rating, comment } = req.body;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const existingReview = await Review.findOne({ hotel: hotelId });

    if (existingReview) {
      return res.status(400).json({ message: 'You already gave a review' });
    }

    const review = new Review({
      hotel: hotel, // Assign the hotel document instead of hotelId
      rating,
      comment,
    });

    await review.save();

    // Calculate new average rating for the hotel
    const reviews = await Review.find({ hotel: hotelId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    hotel.rating = totalRating / reviews.length;
    await hotel.save();

    // Populate the hotel field in the review document
    const populatedReview = await Review.findById(review._id).populate('hotel');

    // Return the hotel name in the response
    const reviewWithHotelName = {
      _id: populatedReview._id,
      hotel: populatedReview.hotel.name, // Access the hotel name from the populated hotel field
      rating: populatedReview.rating,
      comment: populatedReview.comment,
    };

    res.status(201).json(reviewWithHotelName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ...

// Update a review for a hotel
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a review for a hotel
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await Review.deleteOne({ _id: reviewId }); // Use deleteOne() to remove the review

    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createReview, updateReview, deleteReview };
