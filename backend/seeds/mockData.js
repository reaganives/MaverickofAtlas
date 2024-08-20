require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

// Import your models
const User = require('../models/User');
const Item = require('../models/Item');
const Collections = require('../models/Collections');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Review = require('../models/Review');
const Inventory = require('../models/Inventory');
const Payment = require('../models/Payment');
const Shipping = require('../models/Shipping');

// Connect to MongoDB
mongoose.connect('mongodb+srv://reaganives:fMKCDznObK9r1dxg@maverickofatlasdb.k3bup.mongodb.net/?retryWrites=true&w=majority&appName=maverickOfAtlasDB')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany();
    await Item.deleteMany();
    await Collections.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Review.deleteMany();
    await Inventory.deleteMany();
    await Payment.deleteMany();
    await Shipping.deleteMany();
    
    // Define collections
    const collectionsData = [
      { name: 'OCBDs' },
      { name: 'Polos' },
      { name: 'Anoraks' },
      { name: 'Belts' }
    ];
    
    const availableSizes = ['M', 'L']; // Stick to two sizes
    const availableColors = ['Blue', 'White']; // Stick to two colors
    const imageList = [
      '/photos/newarrivals/Blue_OCBD.webp',
      '/photos/newarrivals/Ecru_OCBD.webp',
      '/photos/newarrivals/Blue_Stripe_OCBD.webp'
    ];

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
    
    // Seed Collections, Items, and Inventories
    for (const collectionData of collectionsData) {
      const collection = new Collections({
        name: collectionData.name,
        items: [],
        availableColors: [],  // Initialize empty arrays to populate later
        availableSizes: [],
      });
      await collection.save();
      
      const items = [];
      for (let i = 0; i < 20; i++) {  // Create 20 items per collection
        const color = availableColors[i % availableColors.length];
        const size = availableSizes[i % availableSizes.length];
        const imageUrl = imageList[i % imageList.length];
        
        const inventory = new Inventory({
          color,
          size,
          restockDate: faker.date.past(),
          restockedQuantity: faker.number.int({ min: 5, max: 50 }),
          collection: collection._id,
          stockLevel: 10
        });
        await inventory.save();
        
        const item = new Item({
          name: collectionData.name.slice(0, -1),  // Singular name of collection
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          style: faker.commerce.productAdjective(),
          color: inventory.color,  // Ensure same color as inventory
          size: inventory.size,    // Ensure same size as inventory
          imageUrl,
          collection: collection._id,
          inventory: inventory._id
        });
        await item.save();
        items.push(item._id);
        collection.items.push(item._id);
        inventory.items = [item._id];  // Add the item to the inventory's items array
        await inventory.save();
      }

      await collection.save();
    }

    console.log("Inventory and items created and linked to collections.");
    
    // Add Items to Cart for the Hardcoded Test User, ensuring no duplicate inventory references
    const cartItems = [];
    const uniqueItems = await Item.find().populate('inventory');
    for (let i = 0; i < 3; i++) {
      const item = uniqueItems[i];  // Use a unique item for each cart item
      cartItems.push({
        item: item._id,  // Reference the item directly
        quantity: faker.number.int({ min: 1, max: 5 })
      });
    }
    
    const cart = new Cart({
      user: testUser._id,
      items: cartItems,
    });
    
    await cart.save();
    console.log(`Cart created for hardcoded user: ${testUser.email}`);
    
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
    
    console.log("Database seeded successfully with collections, items, inventory, and all other models!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();









