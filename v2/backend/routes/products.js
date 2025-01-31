// routes/products.js
const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/products');
const authenticateToken = require('../middleware/auth');
const {validateProduct} = require('../middleware/validation');
const upload = require('../middleware/upload');

// Create Product
router.post('/', authenticateToken, upload.single("image"), createProduct);

// Update a product with a new image
router.put('/:id', authenticateToken,upload.single('image'),updateProduct);


// Delete product
router.delete('/:id', authenticateToken, deleteProduct);

// Get product details
router.get('/:id', authenticateToken, getProduct);

module.exports = router;
