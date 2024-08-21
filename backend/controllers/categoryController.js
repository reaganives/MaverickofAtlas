const Category = require('../models/Categories');
const Collection = require('../models/Collections'); // Import Collection model
const Item = require('../models/Item'); // Import Item model

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update category details
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItemsByCollection = async (req, res) => {
  try {
    const { categoryName, collectionName } = req.params;

    // Find the category by its name
    const category = await Category.findOne({ name: categoryName }).populate({
      path: 'collections',
      match: { name: collectionName },
      populate: { path: 'items' }
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const collection = category.collections[0];

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    const items = collection.items;

    // Return the items in the response
    return res.status(200).json({ items });
  } catch (error) {
    console.error('Error fetching items by collection:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};