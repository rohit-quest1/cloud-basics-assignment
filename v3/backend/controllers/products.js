const {pool, s3} = require('../config');

// const createProduct = async (req, res) => {
//     const { name, description, price, stock } = req.body;

//     try {
//         const result = await pool.query(
//             'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
//             [name, description, price, stock]
//         );
//         res.status(201).json({ message: 'Product created successfully', product: result.rows[0] });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const imageUrl = req.file ? req.file.location : null;

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, stock, imageUrl]
        );
        res.status(201).json({ message: 'Product created successfully', product: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const updateProduct = async (req, res) => {
//     const { id } = req.params;
//     const { name, description, price, stock } = req.body;

//     try {
//         const result = await pool.query(
//             'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
//             [name, description, price, stock, id]
//         );

//         if (result.rowCount === 0) {
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product updated successfully', product: result.rows[0] });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const imageUrl = req.file ? req.file.location : null;

    try {
        const query = `
            UPDATE products 
            SET name = $1, description = $2, price = $3, stock = $4, image_url = COALESCE($5, image_url) 
            WHERE id = $6 RETURNING *`;
        const values = [name, description, price, stock, imageUrl, id];

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const deleteProduct = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

//         if (result.rowCount === 0) {
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product deleted successfully', product: result.rows[0] });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch product to get image URL
        const productResult = await pool.query('SELECT image_url FROM products WHERE id = $1', [id]);
        if (productResult.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const imageUrl = productResult.rows[0].image_url;

        // Delete image from S3
        if (imageUrl) {
            const key = imageUrl.split('.amazonaws.com/')[1]; // Extract S3 object key
            await s3.deleteObject({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key
            }).promise();
        }

        // Delete product from DB
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.status(200).json({ message: 'Product deleted successfully' });
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

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getProduct, createProduct, updateProduct, deleteProduct, getAllProducts };
