const express = require('express');
const hotelController = require('../controllers/filterController');

const router = express.Router();

// Create a new hotel
router.post('/hotels', hotelController.createHotel);

// Get all hotels
router.get('/hotels', hotelController.getAllHotels);

// Get top-rated hotels
router.get('/hotels/top-rated', hotelController.getTopRatedHotels);

// Search hotels by name and location
router.get('/hotels/search', hotelController.searchHotels);

module.exports = router;
