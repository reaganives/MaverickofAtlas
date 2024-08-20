const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  newArrival: { type: Boolean, default: true },
  imageUrl: String,
  color: { type: String, required: true },
  size: { type: String, required: true },
  style: { type: String, required: true }, 
  collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collections', required: true },
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },  // Reference to Inventory
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;