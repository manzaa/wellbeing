const db = require('../config/db');

exports.getNumbers = async (req, res) => {
    try {
        const [numbers] = await db.query('SELECT * FROM numbers');
        res.json(numbers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch numbers' });
    }
};
