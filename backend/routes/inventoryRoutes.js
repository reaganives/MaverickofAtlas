const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Get inventory for an item by item ID
router.get('/item/:itemId', inventoryController.getInventoryByItemId);

// Update inventory stock level
router.put('/item/:itemId', inventoryController.updateStockLevel);

// Create a new inventory record for an item
router.post('/', inventoryController.createInventory);

// Delete an inventory record
router.delete('/item/:itemId', inventoryController.deleteInventory);

module.exports = router;
