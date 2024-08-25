const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shopifyOrderId: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  items: [
    {
      productId: { type: String, required: true },
      variantId: { type: String, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  orderDate: { type: Date, required: true },
  status: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

  
  