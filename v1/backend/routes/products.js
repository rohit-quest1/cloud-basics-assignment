// routes/products.js
const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/products');
const authenticateToken = require('../middleware/auth');
const {validateProduct} = require('../middleware/validation');

// Create product
router.post('/', authenticateToken, validateProduct, createProduct);

// Update product
router.put('/:id', authenticateToken, validateProduct, updateProduct);

// Delete product
router.delete('/:id', authenticateToken, deleteProduct);

// Get product details
router.get('/:id', authenticateToken, getProduct);

module.exports = router;
