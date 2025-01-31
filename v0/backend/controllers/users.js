const pool = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Creating an User
const createUser = async (req, res) => {
  
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      
        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );
        const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ user: result.rows[0], token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Reading User Details
const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Updating an User

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username && !email && !password) {
        return res.status(400).json({ error: 'At least one field (username, email, password) is required to update' });
    }

    try {
        // Build dynamic query
        const updates = [];
        if (username) updates.push(`username = '${username}'`);
        if (email) updates.push(`email = '${email}'`);
        if (password) updates.push(`password = '${password}'`); // Ideally hash passwords here

        const updateQuery = `
            UPDATE users 
            SET ${updates.join(', ')} 
            WHERE id = $1 
            RETURNING *;
        `;

        const result = await pool.query(updateQuery, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteUser  = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteQuery = 'DELETE FROM users WHERE id = $1 RETURNING *;';
        const result = await pool.query(deleteQuery, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createUser, getUser, updateUser, deleteUser };
