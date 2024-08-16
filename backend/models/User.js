const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Add name field and mark as required
    dob: { type: String, required: false },  // Add Dob field and mark
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }, // Reference to Cart model
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // Array of references to Orders
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // Array of references to Reviews
    createdAt: { type: Date, default: Date.now },
  });
  
  const User = mongoose.model('User', userSchema);  

module.exports = User;