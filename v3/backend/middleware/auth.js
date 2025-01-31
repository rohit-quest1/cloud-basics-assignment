// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     console.log("inside middle")
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     console.log(authHeader+"ehhhhhhhhhhh")
//     if (!token) {
//         return res.status(401).json({ error: 'Unauthorized access, token missing' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ error: 'Forbidden, invalid token' });
//         }

//         req.user = user;
//         next();
//     });
// };

// // New middleware for admin-only routes
// const requireAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         next();
//     } else {
//         res.status(403).json({ error: 'Access denied: Admin only' });
//     }
// };

// module.exports = { authenticateToken, requireAdmin };

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];  // Check both cases
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized access, token missing' });
    }

    // Check if it follows Bearer pattern
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid authorization format. Use: Bearer <token>' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access, token missing' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Forbidden, invalid token' });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied: Admin only' });
    }
};

module.exports = { authenticateToken, requireAdmin };