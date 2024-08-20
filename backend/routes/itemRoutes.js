const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get all items
router.get('/', itemController.getItems);

// Get new arrivals (this needs to be before the dynamic route)
router.get('/newarrivals', itemController.getNewArrivals);

// Get an item by ID
router.get('/:itemId', itemController.getItemById);

// Create a new item
router.post('/', itemController.createItem);

// Update an item by ID
router.put('/:id', itemController.updateItem);

// Delete an item by ID
router.delete('/:id', itemController.deleteItem);

module.exports = router;
