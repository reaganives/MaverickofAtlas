const Inventory = require('../models/Inventory');

// Get inventory by item ID
exports.getInventoryByItemId = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ item: req.params.itemId });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
