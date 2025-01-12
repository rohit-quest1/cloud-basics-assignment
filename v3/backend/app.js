const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const upload = require('./middleware/upload');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware for logging
app.use(logger);
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? 'your-production-domain.com'
      : 'http://localhost:5173',
    credentials: true
  }));
// Middleware for parsing requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Cake Shop API is running!');
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});