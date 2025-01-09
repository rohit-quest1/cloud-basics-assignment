const {pool} = require('../config');

const createOrder = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    console.log(req.body);
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

    try {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getOrder, createOrder, updateOrder };
