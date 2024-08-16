const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    items: [{
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, // Reference to Item
      quantity: { type: Number, required: true }
    }],
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Cart = mongoose.model('Cart', cartSchema);

  module.exports = Cart;
  
  