// routes/orders.js
const express = require('express');
const router = express.Router();
const { createOrder, updateOrder, getOrder, getAllOrders } = require('../controllers/orders');
const {authenticateToken} = require('../middleware/auth');
const {validateOrder} = require('../middleware/validation');

// Create order
router.post('/', authenticateToken, createOrder);

// Update order
router.put('/:id', authenticateToken, updateOrder);

// Get order details
router.get('/:id', authenticateToken, getOrder);

// Get all orders
router.get('/', authenticateToken, getAllOrders);

module.exports = router;
