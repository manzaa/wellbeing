const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            logger.warn('Unauthorized access attempt');
            return res.sendStatus(403);
        }
        req.user = user; // Attach user data to request
        next();
    });
};
