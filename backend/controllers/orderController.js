const Order = require('../models/Order');
const Inventory = require('../models/Inventory');

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user items.item');
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Server error. Could not fetch orders.' });
  }
};

// Get orders by User ID
exports.getOrderById = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items.item')  // Populates item details within each order
      .populate('shipping')     // Populates shipping details
      .populate('payment');     // Populates payment details

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Get detailed orders by User ID (with Shipping & Payment details)
exports.getOrderDetails = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items.item')
      .populate('shipping')
      .populate('payment')
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No detailed orders found for this user.' });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error('Error fetching order details:', err);
    res.status(500).json({ message: 'Server error. Could not fetch order details.' });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { user, items, totalAmount, shipping, payment } = req.body;
  try {
    const order = new Order({ user, items, totalAmount, shipping, payment });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Server error. Could not create the order.' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Server error. Could not update the order.' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ error: 'Server error. Could not delete the order.' });
  }
};

// Decrease inventory stock after order is placed
exports.completeOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    // Loop through each item in the order and decrement its stock level
    for (const orderItem of items) {
      const inventory = await Inventory.findOne({ item: orderItem.item });
      if (inventory) {
        inventory.stockLevel -= orderItem.quantity;
        if (inventory.stockLevel < 0) inventory.stockLevel = 0; // Ensure stock doesn't go negative
        await inventory.save();
      }
    }

    // Create and save the order
    const order = new Order({ user: userId, items });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


