const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get all items
router.get('/', itemController.getItems);

// Get an item by ID
router.get('/:id', itemController.getItemById);

// Create a new item
router.post('/', itemController.createItem);

// Update an item by ID
router.put('/:id', itemController.updateItem);

// Delete an item by ID
router.delete('/:id', itemController.deleteItem);

module.exports = router;
