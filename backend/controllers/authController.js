const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');
const db = require('../config/db'); // Adjust the path as necessary

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const [user] = await db.query('SELECT * FROM Users WHERE is_verified = 1 AND email = ?', [email]);
        if (user.length === 0) {
            logger.info(`Failed login attempt for email: ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        // const match = await bcrypt.compare(password, user[0].password);
        // if (!match) {
        //     logger.info(`Failed login attempt for email: ${email}`);
        //     return res.status(401).json({ message: 'Invalid email or password' });
        // }

        // Generate JWT token
        const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info(`User logged in: ${email}`);

        // Send response with token
        res.json({ message: 'Login successful', token, user_id: user[0].id, subscribed: user[0].is_subscribed });
    } catch (error) {
        console.log(error);
        logger.error(`Login error: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};
