const {pool} = require('../config');

const createOrder = async (req, res) => {
    console.log("hiiiiiiiiiiiii");

    const { userId, productId, quantity } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [userId, productId, quantity]
        );
        res.status(201).json({ message: 'Order created successfully', order: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const result = await pool.query(
            'UPDATE orders SET quantity = $1 WHERE id = $2 RETURNING *',
            [quantity, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', order: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrder = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const result = await pool.query(`
            SELECT o.*, p.name as product_name 
            FROM orders o
            JOIN products p ON o.product_id = p.id
            WHERE o.user_id = $1`, [id]);
        console.log(result.rows[0])
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT o.*, p.name as product_name, u.email as user_email 
            FROM orders o
            JOIN products p ON o.product_id = p.id
            JOIN users u ON o.user_id = u.id
            ORDER BY o.id DESC
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getOrder, createOrder, updateOrder, getAllOrders };
