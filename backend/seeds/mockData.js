require('dotenv').config();
const mongoose = require('mongoose');

// Import your models
const User = require('../models/User');
const Order = require('../models/Order');
const Review = require('../models/Review');
const Payment = require('../models/Payment');
const Shipping = require('../models/Shipping');

// Connect to MongoDB
mongoose.connect('mongodb+srv://reaganives:fMKCDznObK9r1dxg@maverickofatlasdb.k3bup.mongodb.net/?retryWrites=true&w=majority&appName=maverickOfAtlasDB')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();
    await Payment.deleteMany();
    await Shipping.deleteMany();
    
    console.log("Database cleared.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();









