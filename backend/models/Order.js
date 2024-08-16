const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    items: [{
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, // Reference to Item
      quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    shipping: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipping' }, // Reference to Shipping
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }, // Reference to Payment
    orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
    createdAt: { type: Date, default: Date.now },
  });
  
  const Order = mongoose.model('Order', orderSchema);

  module.exports = Order;
  
  