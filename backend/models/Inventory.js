const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],  // Array of references to Item
    color: { type: String, required: true },  // Track specific color for inventory
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },  // Track specific size for inventory
    stockLevel: { type: Number },  // Track the stock level based on items array length (not directly required)
    restockDate: { type: Date },
    restockedQuantity: { type: Number },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },  // Reference to Collection
    updatedAt: { type: Date, default: Date.now },
});

inventorySchema.pre('save', function(next) {
    // Set stock level based on the number of items in the items array
    this.stockLevel = this.items.length;
    next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;



  
  