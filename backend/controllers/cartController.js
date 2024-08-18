const Cart = require('../models/Cart');
const Item = require('../models/Item');
const Inventory = require('../models/Inventory');
const mongoose = require('mongoose');
const Joi = require('joi');

const addItemToCartSchema = Joi.object({
  userId: Joi.string().required(),
  itemId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  size: Joi.string().required(),
  color: Joi.string().required(),
  style: Joi.string().required(),
});

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.item');
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: err.message });
  }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
  const { userId, itemId, quantity, size, color, style } = req.body;

  // Validate the request data using Joi
  const { error } = addItemToCartSchema.validate({ userId, itemId, quantity, size, color, style });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Ensure userId is a valid ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Find the inventory for the requested item
    const inventory = await Inventory.findOne({ item: itemId });
    if (!inventory) {
      return res.status(404).json({ error: 'Item inventory not found' });
    }

    // Check if the requested quantity exceeds available stock
    if (inventory.stockLevel < quantity) {
      return res.status(400).json({ error: 'Insufficient stock available' });
    }

    // Check if a cart already exists for the user
    let cart = await Cart.findOne({ user: userObjectId });
    if (!cart) {
      // Create a new cart if none exists for the user
      cart = new Cart({ user: userObjectId, items: [] });
    }

    // Check if the item with the same size, color, and style already exists in the cart
    const existingItem = cart.items.find(
      (i) => i.item.toString() === itemId && i.size === size && i.color === color && i.style === style
    );

    if (existingItem) {
      // Check if adding more would exceed available stock
      if (existingItem.quantity + quantity > inventory.stockLevel) {
        return res.status(400).json({ error: 'Adding this quantity would exceed available stock' });
      }

      // Update the quantity of the existing item in the cart
      existingItem.quantity += quantity;
    } else {
      // Add the new item to the cart
      cart.items.push({ item: itemId, quantity, size, color, style });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({ error: 'Server error' });
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


