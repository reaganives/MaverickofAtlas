const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to Order
    carrier: String,
    trackingNumber: String,
    shippingStatus: { type: String, enum: ['Shipped', 'In Transit', 'Delivered'], default: 'Shipped' },
    shippedAt: { type: Date, default: Date.now },
  });
  
  const Shipping = mongoose.model('Shipping', shippingSchema);

  module.exports = Shipping;
  
  