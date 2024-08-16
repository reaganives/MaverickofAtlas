const Cart = require('../models/Cart');

// Get cart by user ID
// In your cartController.js
exports.getCartByUserId = async (req, res) => {
  try {
    console.log("Received userId:", req.params.userId); // Check if userId is correct

    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.item');
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    console.log("Cart found:", cart); // Check what is returned

    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);  // Log the error in detail
    res.status(500).json({ error: err.message });
  }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
  const { itemId, quantity, size, color, style } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [] });
    }

    // Check if the item with the same size, color, and style already exists in the cart
    const existingItem = cart.items.find(
      (i) => i.item.toString() === itemId && i.size === size && i.color === color && i.style === style
    );

    if (existingItem) {
      // Update quantity if the item exists
      existingItem.quantity += quantity;
    } else {
      // Add new item if it doesn't exist
      cart.items.push({ item: itemId, quantity, size, color, style });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
  const { itemId, size, color, style } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.params.userId });

    // Remove the specific item with the matching size, color, and style
    cart.items = cart.items.filter(
      (i) => i.item.toString() !== itemId || i.size !== size || i.color !== color || i.style !== style
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId });
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

