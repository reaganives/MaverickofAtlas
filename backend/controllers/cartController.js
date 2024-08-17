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

// Delete an item from the cart by cartId and itemId
exports.deleteItem = async (req, res) => {
  const { cartId, itemId } = req.params;

  try {
    // Find the cart by ID
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the item from the cart's items array
    cart.items = cart.items.filter((item) => item.item.toString() !== itemId);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    console.error('Error removing item from cart:', err);
    res.status(500).json({ message: 'Server error' });
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

