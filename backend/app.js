require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');

// Connect to MongoDB
connectDB();  // Ensure the database is connected before starting the server

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const authRoutes = require('./routes/authRoutes');

// Import controller
const { getCurrentUser } = require('./controllers/userController');
const verifyToken = require('./middleware/verifyToken');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/auth', authRoutes);

// Define /me route
app.get('/api/me', verifyToken, getCurrentUser);  // Directly reference the controller function

// Start server after the DB connection
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



