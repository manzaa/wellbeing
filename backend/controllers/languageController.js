const db = require('../config/db');

exports.getLanguages = async (req, res) => {
    try {
        const [languages] = await db.query('SELECT * FROM languages');
        res.json({ languages });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching languages' });
    }
};
