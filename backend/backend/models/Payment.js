const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to Order
    amount: { type: Number, required: true },
    method: { type: String, enum: ['Credit Card', 'Paypal', 'Shopify Pay'], required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    paidAt: { type: Date },
    refundStatus: { type: String, enum: ['None', 'Requested', 'Processed'], default: 'None' },
  });
  
  const Payment = mongoose.model('Payment', paymentSchema);
  
  module.exports = Payment;
  