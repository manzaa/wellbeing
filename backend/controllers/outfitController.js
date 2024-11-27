const db = require('../config/db');

exports.getAllOutfits = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM outfits');
        res.json({ outfits: results });
    } catch (error) {
        console.error('Error fetching outfits:', error);
        res.status(500).json({ error: 'Error fetching outfits' });
    }
};

exports.saveUserOutfitSelection = async (req, res) => {
    const { userId, weatherId, outfitId } = req.body;
    const today = new Date().toISOString().split('T')[0];

    try {
        await db.query(
            'INSERT INTO user_outfit_selections (user_id, weather_id, outfit_id, selected_on) VALUES (?, ?, ?, ?)',
            [userId, weatherId, outfitId, today]
        );
        res.json({ message: 'Outfit selection saved successfully' });
    } catch (error) {
        console.error('Error saving outfit selection:', error);
        res.status(500).json({ error: 'Error saving outfit selection' });
    }
};
