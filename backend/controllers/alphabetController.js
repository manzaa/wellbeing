const db = require('../config/db');

exports.getAlphabets = async (req, res) => {
    try {
        const [alphabets] = await db.query('SELECT * FROM alphabets');
        res.json(alphabets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch alphabets' });
    }
};
