const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Get inventory by item, color, and size (query parameters)
router.get('/', inventoryController.getInventoryByColorAndSize);

// Get inventory by inventory ID
router.get('/:inventoryId', inventoryController.getInventoryById);

// Update stock level for an inventory by inventory ID (not itemId)
router.put('/:inventoryId', inventoryController.updateStockLevel);

// Create a new inventory record
router.post('/', inventoryController.createInventory);

// Delete an inventory record by inventory ID (not itemId)
router.delete('/:inventoryId', inventoryController.deleteInventory);

module.exports = router;

