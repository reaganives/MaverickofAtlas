const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
    inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }, // Reference to Inventory
    imageUrl: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // Array of references to Reviews
    createdAt: { type: Date, default: Date.now },
  });
  
  const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
  
