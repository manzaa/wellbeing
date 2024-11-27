const db = require('../config/db');

exports.fetchChallenge = async () => {
    const [challenge] = await db.query('SELECT * FROM challenges WHERE title = ?', ['My Feelings Friend']);
    return challenge[0];
};

exports.fetchEmotions = async () => {
    const [emotions] = await db.query('SELECT * FROM emotions');
    return emotions;
};

exports.fetchEmotionalLogs = async (userId) => {
    const [logs] = await db.query(`
        SELECT l.*, e.name AS emotion_name, e.icon AS emotion_icon
        FROM emotional_logs l 
        JOIN emotions e ON l.emotion_id = e.id 
        WHERE l.user_id = ? ORDER BY l.date DESC
    `, [userId]);
    return logs;
};

exports.logEmotion = async (userId, emotion_id, comment) => {
    await db.query('INSERT INTO emotional_logs (user_id, emotion_id, date, comment) VALUES (?, ?, CURDATE(), ?)', [userId, emotion_id, comment]);
};

exports.fetchBadges = async (userId) => {
    const [badges] = await db.query('SELECT * FROM badges WHERE challenge_id = ?', [1]); // assuming ID 1 for My Feelings Friend
    return badges;
};
