const Collections = require('../models/Collections');
const Item = require('../models/Item');
const mongoose = require('mongoose');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId).exec();

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching item data' });
  }
};

// Get new arrivals
exports.getNewArrivals = async (req, res) => {
  try {
    // Log to confirm the request hits the controller
    console.log('Fetching new arrivals...');
    
    // Find all items where newArrival is true
    const newArrivals = await Item.find({ newArrival: true }).populate('collection');

    // Log to confirm items are being fetched
    console.log('New Arrivals found:', newArrivals);

    // If no new arrivals are found, send an appropriate message
    if (!newArrivals || newArrivals.length === 0) {
      console.log('No new arrivals found');
      return res.status(404).json({ message: 'No new arrivals found' });
    }

    // Send the new arrivals as the response
    res.status(200).json(newArrivals);
  } catch (error) {
    // Log and return a 500 error
    console.error('Error fetching new arrivals:', error);
    res.status(500).json({ error: 'Server error fetching new arrivals' });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  const { name, description, price, category, inventory } = req.body;
  try {
    const item = new Item({ name, description, price, category, inventory });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update item details
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
