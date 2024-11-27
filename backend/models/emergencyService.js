const db = require('../config/db');

exports.fetchChallenge = async () => {
    const [challenge] = await db.query('SELECT * FROM challenges WHERE title = ?', ['Emergency 101']);
    return challenge[0];
};

exports.fetchScenarios = async () => {
    const [scenarios] = await db.query(`
        SELECT s.*, a.action_text, a.is_correct, a.id AS action_id 
        FROM scenarios s 
        JOIN actions a ON s.id = a.scenario_id
    `);
    return scenarios;
};

exports.evaluateResponse = async (userId, scenario_id, action_id) => {
    const [action] = await db.query('SELECT is_correct FROM actions WHERE id = ?', [action_id]);
    const score = action[0].is_correct ? 10 : 0;

    await db.query('INSERT INTO user_scores (user_id, scenario_id, score) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE score = ?', [userId, scenario_id, score, score]);
    return { success: action[0].is_correct, score };
};

exports.fetchBadges = async (userId) => {
    const [badges] = await db.query('SELECT * FROM badges WHERE challenge_id = ?', [1]); // assuming ID 1 for Emergency 101
    return badges;
};

exports.fetchScore = async (userId) => {
    const [score] = await db.query('SELECT SUM(score) AS total_score FROM user_scores WHERE user_id = ?', [userId]);
    return score[0].total_score || 0;
};
