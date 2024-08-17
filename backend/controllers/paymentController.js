const Payment = require('../models/Payment');

// Get payment by ID
exports.getPaymentByOrderId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const payment = await Payment.findOne({ order: req.params.id });
    if (!payment) {
      console.log(`No payment data found for order ID: ${req.params.id}`);
      return res.status(404).json({ message: "Payment data not found" });
    }
    res.json({ payment });
  } catch (err) {
    console.error('Error fetching payment data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Create a new payment
exports.createPayment = async (req, res) => {
  const { order, amount, method } = req.body;
  try {
    const payment = new Payment({ order, amount, method, paymentStatus: 'Pending' });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
