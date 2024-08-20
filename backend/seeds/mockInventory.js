require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

// Import your models
const Category = require('../models/Categories');
const Collections = require('../models/Collections');
const Item = require('../models/Item');
const Inventory = require('../models/Inventory');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Shipping = require('../models/Shipping');

// Connect to MongoDB
mongoose.connect('mongodb+srv://reaganives:fMKCDznObK9r1dxg@maverickofatlasdb.k3bup.mongodb.net/?retryWrites=true&w=majority&appName=maverickOfAtlasDB')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

async function seedDatabase() {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Collections.deleteMany();
    await Item.deleteMany();
    await Inventory.deleteMany();
    await Cart.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    await Payment.deleteMany();
    await Shipping.deleteMany();

    console.log('Existing data cleared.');

    // Define categories and their respective collections
    const categoriesData = [
      { name: 'Shirts', collections: ['OCBDs', 'Polos'] },
      { name: 'Jackets & Outerwear', collections: ['Anoraks', 'Vintage S-22'] },
      { name: 'Accessories', collections: ['Belts', 'Socks'] },
    ];

    const availableColors = ['White', 'Blue', 'Green'];
    const availableSizes = ['M', 'L'];

     // Create Hardcoded Test User
     const plainPassword = 'password123';
     const hashedPassword = await bcrypt.hash(plainPassword, 10);
     const testUser = new User({
       name: 'Maverick of Atlas',
       dob: new Date('1990-01-01'),
       email: 'maverickofatlas@gmail.com',
       password: hashedPassword,
       isVerified: true,
       createdAt: new Date(),
     });
     await testUser.save();
     console.log(`Hardcoded test user created: ${testUser.email} with password: ${plainPassword}`);

    // Loop through categories and create them
    for (const categoryData of categoriesData) {
      const category = new Category({ name: categoryData.name, collections: [] });
      await category.save();

      // Loop through collections for each category
      for (const collectionName of categoryData.collections) {
        const collection = new Collections({
          name: collectionName,
          availableColors,
          availableSizes,
          items: [],
        });
        await collection.save();

        // Add the collection to the category
        category.collections.push(collection._id);

        // Create four inventory models for each collection
        const colorSizeCombinations = [
          { color: 'White', size: 'M' },
          { color: 'White', size: 'L' },
          { color: 'Blue', size: 'M' },
          { color: 'Blue', size: 'L' },
          { color: 'Green', size: 'M' },
          { color: 'Green', size: 'L' }
        ];

        const allItems = [];

        for (const combination of colorSizeCombinations) {
          const inventory = new Inventory({
            collection: collection._id,
            color: combination.color,
            size: combination.size,
            items: []
          });
          await inventory.save();

          // Create 10 items per inventory
          for (let i = 0; i < 10; i++) {
            const item = new Item({
              name: collectionName.slice(0, -1), // Singular name of collection
              description: faker.commerce.productDescription(),
              price: faker.commerce.price(),
              style: faker.commerce.productAdjective(),
              imageUrl: faker.image.url(),  // Use a random image from faker for now
              color: combination.color,
              size: combination.size,
              collection: collection._id,
              inventory: inventory._id
            });
            await item.save();

            // Add item to inventory and collection
            inventory.items.push(item._id);
            allItems.push(item._id);
          }

          // Save inventory after adding items
          await inventory.save();
        }

        // Assign all items to the collection
        collection.items = allItems;
        await collection.save();
      }

      // Save the category after adding collections
      await category.save();
    }

    // Create Orders, Payment, and Shipping for the Hardcoded Test User
    for (let i = 0; i < 3; i++) {
        const orderItems = [];
  
        for (let j = 0; j < 3; j++) {
          const item = faker.helpers.arrayElement(await Item.find()); // Fetch an item
          orderItems.push({
            item: item._id, // Use item reference here
            quantity: faker.number.int({ min: 1, max: 5 }),
          });
        }
  
        const order = new Order({
          user: testUser._id,
          items: orderItems,
          totalAmount: faker.commerce.price(),
          orderStatus: faker.helpers.arrayElement(['Processing', 'Shipped', 'Delivered']),
          createdAt: faker.date.past(),
        });
  
        await order.save();
  
        const payment = new Payment({
          order: order._id,
          amount: order.totalAmount,
          method: faker.helpers.arrayElement(['Credit Card', 'Paypal', 'Shopify Pay']),
          paymentStatus: faker.helpers.arrayElement(['Paid', 'Pending', 'Failed']),
        });
  
        await payment.save();
        order.payment = payment._id;
  
        const shipping = new Shipping({
          order: order._id,
          carrier: faker.company.name(),
          trackingNumber: faker.string.uuid(),
          shippingStatus: faker.helpers.arrayElement(['Shipped', 'In Transit', 'Delivered']),
        });
  
        await shipping.save();
        order.shipping = shipping._id;
        await order.save();
      }

    console.log('Categories, collections, items, and inventory seeded successfully.');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
