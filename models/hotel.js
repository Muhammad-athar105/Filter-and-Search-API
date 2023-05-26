// models/hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  roomType: {
    type: String
  },
  facilities: {
    type: String
  },
  sector: {
    type: String  
  },
  price:{
  type: Number,
  },
  rating:{
    type: String
  }
});

module.exports = mongoose.model('Hotel', hotelSchema);
