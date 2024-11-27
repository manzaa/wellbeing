const db = require('../config/db');

// Service to get badges by user ID
exports.getBadgesByUser = async (userId) => {
    const query = 'SELECT * FROM badges WHERE user_id = ?';
    const [rows] = await db.query(query, [userId]);
    return rows;
};

// Service to add a new badge
exports.addBadge = async (userId, badgeName) => {
    const query = 'INSERT IGNORE INTO badges (user_id, badge_name) VALUES (?, ?)';
    await db.query(query, [userId, badgeName]);
};