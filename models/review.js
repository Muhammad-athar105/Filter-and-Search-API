// models/review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
