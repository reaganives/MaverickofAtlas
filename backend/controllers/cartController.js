const mongoose = require('mongoose');
const Joi = require('joi');
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const Inventory = require('../models/Inventory');

const addItemToCartSchema = Joi.object({
  userId: Joi.string().required(),
  collectionId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  size: Joi.string().required(),
  color: Joi.string().required(),
});

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
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

// Add item to cart by finding the correct inventory and picking the first item
exports.addItemToCart = async (req, res) => {
  const { userId, collectionId, color, size, quantity } = req.body;

  // Validate the request data (using Joi or custom validation)
  const { error } = addItemToCartSchema.validate({ userId, collectionId, color, size, quantity });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Ensure userId is a valid ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Find the correct inventory by collection, color, and size
    const inventory = await Inventory.findOne({
      collection: collectionId,
      color,
      size,
    });

    // If no inventory is found or there are no items, return an error
    if (!inventory || inventory.items.length === 0) {
      return res.status(404).json({ error: 'No inventory available for the selected options' });
    }

    // Check if the requested quantity exceeds the available stock
    if (inventory.stockLevel < quantity) {
      return res.status(400).json({ error: 'Insufficient stock available' });
    }

    // Pick the first item from the inventory's items array
    const itemToAdd = inventory.items[0];

    // Find the cart for the user, or create one if it doesn't exist
    let cart = await Cart.findOne({ user: userObjectId });
    if (!cart) {
      cart = new Cart({ user: userObjectId, items: [] });
    }

    // Check if the item with the same size and color already exists in the cart
    const existingItem = cart.items.find(cartItem => cartItem.item.toString() === itemToAdd.toString());

    if (existingItem) {
      // Check if adding more would exceed available stock
      if (existingItem.quantity + quantity > inventory.stockLevel) {
        return res.status(400).json({ error: 'Adding this quantity would exceed available stock' });
      }

      // Update the quantity of the existing item in the cart
      existingItem.quantity += quantity;
    } else {
      // Add the new item to the cart
      cart.items.push({ item: itemToAdd, quantity });
    }

    // Save the updated cart
    await cart.save();

    // Decrease the stock level in the inventory
    inventory.stockLevel -= quantity;
    await inventory.save();

    return res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error('Error adding item to cart:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};


// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;

    // Find the cart
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find and remove the item from the cart
    const itemIndex = cart.items.findIndex(item => item.item.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the cart
    await cart.save();
    return res.status(200).json({ message: 'Item removed', cart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return res.status(500).json({ message: 'Server error', error });
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

// Update quantity of an item in the cart
exports.updateItemQuantity = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const { newQuantity } = req.body;

    // Find the cart
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const cartItem = cart.items.find(item => item.item.toString() === itemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Find the item in the database with its inventory reference
    const item = await Item.findById(itemId).populate('inventory');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the item's inventory exists
    if (!item.inventory) {
      return res.status(400).json({ message: 'Inventory not associated with the item' });
    }

    // Get the inventory stock level
    const inventoryStockLevel = item.inventory.stockLevel;

    // Check if the new quantity exceeds available stock
    if (newQuantity > inventoryStockLevel) {
      return res.status(400).json({ message: `Insufficient stock available. Only ${inventoryStockLevel} items left.` });
    }

    // Update the quantity in the cart
    cartItem.quantity = newQuantity;

    // Save the cart with the updated quantity
    await cart.save();

    return res.status(200).json({ message: 'Quantity updated', cart });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};



