const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Add name field and mark as required
    dob: { type: String, required: false },  // Add Dob field and mark
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    verificationToken: String
  });
  
  const User = mongoose.model('User', userSchema);  

module.exports = User;