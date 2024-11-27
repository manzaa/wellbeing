const db = require('../config/db');

exports.getTodayWeather = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    await db.query('SELECT * FROM weather WHERE date = ?', [today], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching weather data' });
        }
        res.json({ weather: results[0] });
    });
};
