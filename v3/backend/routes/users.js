const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser, loginUser } = require('../controllers/users');
const {authenticateToken} = require('../middleware/auth');
const {validateUser} = require('../middleware/validation');

router.post('/', validateUser, createUser);
router.get('/:id', authenticateToken, getUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);
router.post('/login', loginUser);



module.exports = router;


