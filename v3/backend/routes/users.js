// const express = require('express');
// const router = express.Router();
// const { createUser, getUser, updateUser, deleteUser, loginUser } = require('../controllers/users');
// const {authenticateToken} = require('../middleware/auth');
// const {validateUser} = require('../middleware/validation');

// router.post('/', validateUser, createUser);
// router.get('/:id', authenticateToken, getUser);
// router.put('/:id', authenticateToken, updateUser);
// router.delete('/:id', authenticateToken, deleteUser);
// router.post('/login', loginUser);



// module.exports = router;

const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser, loginUser } = require('../controllers/users');
const { authenticateToken } = require('../middleware/auth');
const { validateUser } = require('../middleware/validation');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Encrypted password of the user
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/', validateUser, createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticateToken, getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       400:
 *         description: No fields to update
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticateToken, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticateToken, deleteUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginUser);

module.exports = router;