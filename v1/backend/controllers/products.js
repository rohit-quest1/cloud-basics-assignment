const pool = require('../config');

const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, stock]
        );
        res.status(201).json({ message: 'Product created successfully', product: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    try {
        const result = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
            [name, description, price, stock, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', product: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getProduct, createProduct, updateProduct, deleteProduct };
