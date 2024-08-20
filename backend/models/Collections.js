// models/Collection.js
const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  availableColors: [{ type: String, required: true }],
  availableSizes: [{ type: String, required: true }],
});

const Collections = mongoose.model('Collections', collectionSchema);

module.exports = Collections;
