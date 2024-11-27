const db = require('../config/db');

exports.fetchChallenge = async () => {
    const [challenge] = await db.query('SELECT * FROM challenges WHERE title = ?', ['Eco Explorer']);
    return challenge[0];
};

exports.fetchNatureItems = async () => {
    const [items] = await db.query('SELECT * FROM nature_items');
    return items;
};

exports.fetchSightings = async (userId) => {
    const [sightings] = await db.query(`
        SELECT s.*, n.name AS item_name, n.icon AS item_icon
        FROM sightings s 
        JOIN nature_items n ON s.item_id = n.id 
        WHERE s.user_id = ? ORDER BY s.date DESC
    `, [userId]);
    return sightings;
};

exports.logSighting = async (userId, item_id, location, notes) => {
    await db.query('INSERT INTO sightings (user_id, item_id, date, location, notes) VALUES (?, ?, CURDATE(), ?, ?)', [userId, item_id, location, notes]);
};

exports.fetchBadges = async (userId) => {
    const [badges] = await db.query('SELECT * FROM badges WHERE challenge_id = ?', [1]); // assuming ID 1 for Eco Explorer
    return badges;
};
