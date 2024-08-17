require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
mongoose.connect('mongodb+srv://reaganives:fMKCDznObK9r1dxg@maverickofatlasdb.k3bup.mongodb.net/?retryWrites=true&w=majority&appName=maverickOfAtlasDB')  // Replace with your connection string
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

    // Create Hardcoded Test User
    const plainPassword = 'password123';  // Set a password you can use
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const testUser = new User({
      name: 'Maverick of Atlas',
      dob: new Date('1990-01-01'), // Example DOB
      email: 'maverickofatlas@gmail.com',
      password: hashedPassword,
      isVerified: true,
      createdAt: new Date(),  // Set the join date to now
    });

    await testUser.save();
    console.log(`Hardcoded test user created: ${testUser.email} with password: ${plainPassword}`);

    // Create Items and Inventory
    const items = [];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
    for (let i = 0; i < 20; i++) {
      const category = faker.helpers.arrayElement(categories);

      const item = new Item({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: category._id,
        imageUrl: faker.image.url(),
        size: faker.helpers.arrayElement(sizes),  // Random size
        color: faker.helpers.arrayElement(colors),  // Random color
        style: faker.commerce.productAdjective(),  // Random style code
      });
      await item.save();
      items.push(item);

      // Create inventory for each item
      const inventory = new Inventory({
        item: item._id,
        stockLevel: faker.number.int({ min: 1, max: 100 }),
        restockDate: faker.date.past(),
        restockedQuantity: faker.number.int({ min: 5, max: 50 }),
      });
      await inventory.save();

      // Update item with inventory reference
      item.inventory = inventory._id;
      await item.save();
    }

    // Add Items to Cart for the Hardcoded Test User
    const cartItems = [];
    for (let i = 0; i < 3; i++) {
      const item = faker.helpers.arrayElement(items);
      cartItems.push({
        item: item._id,
        quantity: faker.number.int({ min: 1, max: 5 }),
        size: faker.helpers.arrayElement(sizes),
        color: faker.helpers.arrayElement(colors),
      });
    }

    const cart = new Cart({
      user: testUser._id,
      items: cartItems,
    });

    await cart.save();
    console.log(`Cart created for hardcoded user: ${testUser.email}`);

    // Create Orders, Payment, and Shipping for the Hardcoded Test User
    for (let i = 0; i < 3; i++) {  // Create 3 orders for the test user
      const orderItems = [];

      for (let j = 0; j < 3; j++) {
        const item = faker.helpers.arrayElement(items);
        orderItems.push({
          item: item._id,
          quantity: faker.number.int({ min: 1, max: 5 }),
        });
      }

      // Create order first
      const order = new Order({
        user: testUser._id,
        items: orderItems,
        totalAmount: faker.commerce.price(),
        orderStatus: faker.helpers.arrayElement(['Processing', 'Shipped', 'Delivered']),
        createdAt: faker.date.past(),
      });
      await order.save();

      // Create Payment linked to the order
      const payment = new Payment({
        order: order._id,
        amount: order.totalAmount,
        method: faker.helpers.arrayElement(['Credit Card', 'Paypal', 'Shopify Pay']),
        paymentStatus: faker.helpers.arrayElement(['Paid', 'Pending', 'Failed']),
      });
      await payment.save();

      // Update the order with the payment reference
      order.payment = payment._id;

      // Create Shipping linked to the order
      const shipping = new Shipping({
        order: order._id,
        carrier: faker.company.name(),
        trackingNumber: faker.string.uuid(),
        shippingStatus: faker.helpers.arrayElement(['Shipped', 'In Transit', 'Delivered']),
      });
      await shipping.save();

      // Update the order with the shipping reference
      order.shipping = shipping._id;

      // Save the order with updated references
      await order.save();
    }

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();







