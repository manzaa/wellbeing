const db = require('../config/db');

exports.getLettersByLanguage = async (req, res) => {
    const { languageId } = req.params;
    try {
        const [letters] = await db.query('SELECT * FROM letters WHERE language_id = ?', [languageId]);
        res.json({ letters });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching letters for language' });
    }
};
