const mongoose = require('mongoose');
const Joi = require('joi');
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const Inventory = require('../models/Inventory');

// Validation schema for adding an item to the cart
const addItemToCartSchema = Joi.object({
  collectionId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  size: Joi.string().required(),
  color: Joi.string().required(),
});

// Get cart for authenticated user
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;  // Use the authenticated user's ID from the token
    
    const cart = await Cart.findOne({ user: userId }).populate('items.item');
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Add item to cart for authenticated user
exports.addItemToCart = async (req, res) => {
  const { collectionId, color, size, quantity } = req.body;
  const userId = req.user.id;  // Get user ID from token

  // Validate the request data
  const { error } = addItemToCartSchema.validate({ collectionId, color, size, quantity });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Find the correct inventory by collection, color, and size
    const inventory = await Inventory.findOne({
      collection: collectionId,
      color,
      size,
    });

    if (!inventory || inventory.items.length === 0) {
      return res.status(404).json({ error: 'No inventory available for the selected options' });
    }

    if (inventory.stockLevel < quantity) {
      return res.status(400).json({ error: 'Insufficient stock available' });
    }

    const itemToAdd = inventory.items[0];

    // Find the user's cart or create one if it doesn't exist
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(cartItem => cartItem.item.toString() === itemToAdd.toString());

    if (existingItem) {
      if (existingItem.quantity + quantity > inventory.stockLevel) {
        return res.status(400).json({ error: 'Adding this quantity would exceed available stock' });
      }
      existingItem.quantity += quantity;  // Update quantity
    } else {
      cart.items.push({ item: itemToAdd, quantity });  // Add new item to the cart
    }

    await cart.save();

    // Update inventory stock
    inventory.stockLevel -= quantity;
    await inventory.save();

    return res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error('Error adding item to cart:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Remove item from cart for authenticated user
exports.removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user.id;  // Get the authenticated user's ID
    const { itemId } = req.params;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.item.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    return res.status(200).json({ message: 'Item removed', cart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Clear cart for authenticated user
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;  // Get the authenticated user's ID

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (err) {
    console.error('Error clearing cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update quantity of an item in the cart for authenticated user
exports.updateItemQuantity = async (req, res) => {
  try {
    const userId = req.user.id;  // Get the authenticated user's ID
    const { itemId } = req.params;
    const { newQuantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.items.find(item => item.item.toString() === itemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const item = await Item.findById(itemId).populate('inventory');
    if (!item || !item.inventory) {
      return res.status(400).json({ message: 'Item or inventory not found' });
    }

    if (newQuantity > item.inventory.stockLevel) {
      return res.status(400).json({ message: `Insufficient stock available. Only ${item.inventory.stockLevel} items left.` });
    }

    cartItem.quantity = newQuantity;
    await cart.save();

    return res.status(200).json({ message: 'Quantity updated', cart });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};




