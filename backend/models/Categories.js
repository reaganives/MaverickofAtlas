const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collections' }], // Array of references to Items
  });
  
const Categories = mongoose.model('Categories', categorySchema);

module.exports = Categories;