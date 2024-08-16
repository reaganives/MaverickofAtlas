require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');  // Import bcryptjs for hashing

// Import your models
const User = require('../models/User');
const Item = require('../models/Item');
const Category = require('../models/Categories');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Review = require('../models/Review');
const Inventory = require('../models/Inventory');
const Payment = require('../models/Payment');
const Shipping = require('../models/Shipping');

// Connect to MongoDB
mongoose.connect("mongodb+srv://reaganives:fMKCDznObK9r1dxg@maverickofatlasdb.k3bup.mongodb.net/?retryWrites=true&w=majority&appName=maverickOfAtlasDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany();
    await Item.deleteMany();
    await Category.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Review.deleteMany();
    await Inventory.deleteMany();
    await Payment.deleteMany();
    await Shipping.deleteMany();

    // Create Categories
    const categories = [];
    for (let i = 0; i < 5; i++) {
      const category = new Category({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
      });
      categories.push(category);
      await category.save();
    }

    // Create Users with hashed passwords
    const users = [];
    for (let i = 0; i < 10; i++) {
      const plainPassword = faker.internet.password();  // Generate a plain password
      const hashedPassword = await bcrypt.hash(plainPassword, 10);  // Hash the password

      const user = new User({
        name: faker.person.fullName(),  // Generate full name
        dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),  // Generate DOB
        email: faker.internet.email(),
        password: hashedPassword,  // Store the hashed password
      });

      await user.save();
      users.push(user);
      console.log(`Created user: ${user.email} with password: ${plainPassword}`);
    }

    // Create Items and Inventory
    const items = [];
    for (let i = 0; i < 20; i++) {
      const category = faker.helpers.arrayElement(categories);

      const item = new Item({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: category._id,
        imageUrl: faker.image.url(),  // Updated function
      });
      await item.save();
      items.push(item);

      // Create inventory for each item
      const inventory = new Inventory({
        item: item._id,  // Reference the created item
        stockLevel: faker.number.int({ min: 1, max: 100 }),  // Updated function
        restockDate: faker.date.past(),
        restockedQuantity: faker.number.int({ min: 5, max: 50 }),  // Updated function
      });
      await inventory.save();

      // Update item with inventory reference if needed
      item.inventory = inventory._id;
      await item.save();
    }

    // Create Reviews
    for (let i = 0; i < 30; i++) {
      const user = faker.helpers.arrayElement(users);
      const item = faker.helpers.arrayElement(items);

      const review = new Review({
        user: user._id,
        item: item._id,
        rating: faker.number.int({ min: 1, max: 5 }),  // Updated function
        comment: faker.lorem.sentence(),
      });
      await review.save();
    }

    // Create Carts
    for (let i = 0; i < 10; i++) {
      const user = faker.helpers.arrayElement(users);
      const cartItems = [];

      for (let j = 0; j < 3; j++) {
        const item = faker.helpers.arrayElement(items);
        cartItems.push({ item: item._id, quantity: faker.number.int({ min: 1, max: 5 }) });
      }

      const cart = new Cart({
        user: user._id,
        items: cartItems,
      });
      await cart.save();
    }

    // Create Orders
    for (let i = 0; i < 15; i++) {
      const user = faker.helpers.arrayElement(users);
      const orderItems = [];

      for (let j = 0; j < 3; j++) {
        const item = faker.helpers.arrayElement(items);
        orderItems.push({ item: item._id, quantity: faker.number.int({ min: 1, max: 5 }) });
      }

      const order = new Order({
        user: user._id,
        items: orderItems,
        totalAmount: faker.commerce.price(),
        orderStatus: faker.helpers.arrayElement(['Processing', 'Shipped', 'Delivered']),
        createdAt: faker.date.past(),
      });
      await order.save();

      // Create Payment for Order
      const payment = new Payment({
        order: order._id,
        amount: order.totalAmount,
        method: faker.helpers.arrayElement(['Credit Card', 'Paypal', 'Shopify Pay']),
        paymentStatus: faker.helpers.arrayElement(['Paid', 'Pending', 'Failed']),
      });
      await payment.save();

      // Create Shipping for Order
      const shipping = new Shipping({
        order: order._id,
        carrier: faker.company.name(),
        trackingNumber: faker.string.uuid(),
        shippingStatus: faker.helpers.arrayElement(['Shipped', 'In Transit', 'Delivered']),
      });
      await shipping.save();
    }

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();




