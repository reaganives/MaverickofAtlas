const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, // Reference to Item
    stockLevel: { type: Number, required: true },
    restockDate: { type: Date },
    restockedQuantity: { type: Number },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Inventory = mongoose.model('Inventory', inventorySchema);

  module.exports = Inventory;
  
  