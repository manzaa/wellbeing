const db = require('../config/db');

exports.fetchChallenge = async () => {
    console.log("budget");
    const [challenge] = await db.query('SELECT * FROM challenges WHERE title = ?', ['Budget Buddy']);
    return challenge[0];
};

exports.fetchTasks = async () => {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE challenge_id = ?', [1]); // assuming ID 1 for Budget Buddy
    return tasks;
};

exports.fetchItems = async (id) => {
    const [items] = await db.query('SELECT * FROM items WHERE challenge_id = ?', [id]);
    console.log("items", items);
    return items;
};

exports.fetchBadges = async () => {
    const [badges] = await db.query('SELECT * FROM badges WHERE challenge_id = ?', [1]);
    return badges;
};
