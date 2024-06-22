const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Import the User model

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized a' });
    }

    try {
        const user = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        if (error.message === 'jwt expired') {
            return res.status(401).json({ error: 'Token expired' });
        } else {
            return res.status(401).json({ error: 'Unauthorized 1' });
        }
    }
};

// requireAuth middleware
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
};


module.exports = { requireAuth };
