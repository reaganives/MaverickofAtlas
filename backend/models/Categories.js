const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] // Array of references to Items
  });
  
const Categories = mongoose.model('Categories', categorySchema);

module.exports = Categories;