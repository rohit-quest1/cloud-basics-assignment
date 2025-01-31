// routes/orders.js
const express = require('express');
const router = express.Router();
const { createOrder, updateOrder, getOrder } = require('../controllers/orders');
const authenticateToken = require('../middleware/auth');
const {validateOrder} = require('../middleware/validation');

// Create order
router.post('/', authenticateToken, validateOrder, createOrder);

// Update order
router.put('/:id', authenticateToken, validateOrder, updateOrder);

// Get order details
router.get('/:id', authenticateToken, getOrder);

module.exports = router;
