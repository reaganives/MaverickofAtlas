require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Connect to MongoDB
connectDB();  // Ensure the database is connected before starting the server

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/health', (req, res) => {
  res.send('yes hello very health yes mmm');
});

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
      const allowedOrigins = ['https://moa.reaganives.io', 'http://localhost:5173'];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,  // Allow credentials (cookies) to be sent
}));


// Import routes
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const authRoutes = require('./routes/authRoutes');
const shopifyRoutes = require('./routes/shopifyRoutes');

// Import controller
const { getCurrentUser } = require('./controllers/userController');
const verifyToken = require('./middleware/verifyToken');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shopify', shopifyRoutes);

// Define /me route
app.get('/api/me', verifyToken, getCurrentUser);  // Directly reference the controller function

// Start server after the DB connection
const PORT = 4000;
const HOST = '0.0.0.0'; // Listen on all available IPv4 interfaces

app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));