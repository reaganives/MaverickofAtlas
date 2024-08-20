const express = require('express');
const router = express.Router();
const collectionsController = require('../controllers/collectionsController');

router.get('/:collectionName', collectionsController.getCollectionByName);

// Get Collection by Size and Color
router.get('/:collectionName/sizes-colors', collectionsController.getAvailableSizesColors);

router.get('/:collectionName/:itemId', collectionsController.getItemByCollectionAndItemId);

module.exports = router;  // Ensure the router is exported