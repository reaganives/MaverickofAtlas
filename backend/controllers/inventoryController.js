const Inventory = require('../models/Inventory');

// Get inventory by item ID
exports.getInventoryById = async (req, res) => {
  try {
    const inventoryId = req.params.inventoryId;  // Ensure this is an ObjectId string
    const inventory = await Inventory.findById(inventoryId);  // This expects a valid ObjectId

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.json({ inventory });
  } catch (error) {
    console.error('Error fetching inventory by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get inventory by Color and Size
exports.getInventoryByColorAndSize = async (req, res) => {
  try {
    const { item, color, size } = req.query;

    // Find the inventory based on item, color, and size
    const inventory = await Inventory.findOne({
      items: item,  // Array of item IDs in the inventory
      color: color,
      size: size
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found for the specified item, color, and size.' });
    }

    return res.status(200).json({ inventory });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update inventory stock level
exports.updateStockLevel = async (req, res) => {
  const { stockLevel, restockDate, restockedQuantity } = req.body;
  try {
    const inventory = await Inventory.findOneAndUpdate(
      { item: req.params.itemId },
      { stockLevel, restockDate, restockedQuantity },
      { new: true }
    );
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create inventory for a new item
exports.createInventory = async (req, res) => {
  const { item, stockLevel } = req.body;
  try {
    const inventory = new Inventory({ item, stockLevel });
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete inventory record
exports.deleteInventory = async (req, res) => {
  try {
    await Inventory.findOneAndDelete({ item: req.params.itemId });
    res.json({ message: "Inventory record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
