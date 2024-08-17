const Shipping = require('../models/Shipping');

// Get shipping details by order ID
exports.getShippingById = async (req, res) => {
  try {
    const shipping = await Shipping.findOne({ order: req.params.id });
    if (!shipping) {
      console.log(`No shipping data found for order ID: ${req.params.id}`);
      return res.status(404).json({ message: "Shipping data not found" });
    }
    res.json({ shipping });
  } catch (err) {
    console.error('Error fetching shipping data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Create shipping record
exports.createShipping = async (req, res) => {
  const { order, carrier, trackingNumber, shippingStatus } = req.body;
  try {
    const shipping = new Shipping({ order, carrier, trackingNumber, shippingStatus });
    await shipping.save();
    res.status(201).json(shipping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update shipping status
exports.updateShippingStatus = async (req, res) => {
  try {
    const shipping = await Shipping.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(shipping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a shipping record
exports.deleteShipping = async (req, res) => {
  try {
    await Shipping.findByIdAndDelete(req.params.id);
    res.json({ message: "Shipping record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
