const Hotel = require('../models/hotel');
const Review = require('../models/review');


// Create a new hotel
const createHotel = async (req, res) => {
  try {
    const { name, address, room_type, facilities, sector, price } = req.body;
    const existingHotel = await Hotel.findOne({ $or: [{ name },] });
    
    if (existingHotel) {
      return res.status(409).json({ message: 'Hotel already exists' });
    }

    const hotel = new Hotel({
      name,
      address,
      room_type,
      facilities,
      sector,
      price
    });
    await hotel.save();
    res.status(201).json({message: "Successfully added the Hotel"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Rest of the code remains the same...


// Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get top-rated hotels
const getTopRatedHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ rating: -1 }).limit(10);
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Search hotels by name, location, and price range
const searchHotels = async (req, res) => {
  try {
    const { name, address, minPrice, maxPrice, roomType, facilities, sector } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (address) {
      query.address = { $regex: address, $options: 'i' };
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: parseInt(maxPrice) };
    }

    if (roomType) {
      query.roomType = { $regex: roomType, $options: 'i' };
    }

    if (facilities) {
      query.facilities = { $regex: facilities, $options: 'i' };
    }

    if (sector) {
      query.sector = { $regex: sector, $options: 'i' };
    }

    const hotels = await Hotel.find(query);

    if (hotels.length === 0) {
      return res.status(404).json({ message: 'Sorry we cannot find' });
    }

    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getTopRatedHotels, searchHotels,createHotel, getAllHotels  };

