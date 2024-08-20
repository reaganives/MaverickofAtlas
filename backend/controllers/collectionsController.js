const Collection = require('../models/Collections');
const Item = require('../models/Item');

// Get a collection by collectionName
exports.getCollectionByName = async (req, res) => {
  const { collectionName } = req.params;

  try {
    // Find the collection by collectionName
    const collection = await Collection.findOne({ name: collectionName });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    // Populate the items inside the collection
    const items = await Item.find({ collection: collection._id });

    res.status(200).json({
      collection: {
        availableColors: collection.availableColors,
        availableSizes: collection.availableSizes,
        items,
      },
    });
  } catch (error) {
    console.error('Error fetching collection by name:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get an item by collectionName and itemId
exports.getItemByCollectionAndItemId = async (req, res) => {
  const { collectionName, itemId } = req.params;

  try {
    // Find the collection by collectionName
    const collection = await Collection.findOne({ name: collectionName });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    // Find the item in that collection by its itemId
    const item = await Item.findOne({ _id: itemId, collection: collection._id });

    if (!item) {
      return res.status(404).json({ message: 'Item not found in this collection' });
    }

    res.status(200).json({ item });
  } catch (error) {
    console.error('Error fetching item by collection and itemId:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAvailableSizesColors = async (req, res) => {
  try {
    const { collectionName } = req.params;

    // Fetch the collection based on collection name
    const collection = await Collection.findOne({ name: collectionName });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    const availableSizes = collection.availableSizes;
    const availableColors = collection.availableColors;

    res.status(200).json({ availableSizes, availableColors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
