const db = require('../config/db');

exports.fetchChallenge = async () => {
    const [challenge] = await db.query('SELECT * FROM challenges WHERE title = ?', ['Plan-a-Day']);
    return challenge[0];
};

exports.fetchActivities = async () => {
    const [activities] = await db.query('SELECT * FROM activities WHERE challenge_id = ?', [1]); // assuming ID 1 for Plan-a-Day
    return activities;
};

exports.fetchSchedule = async (userId) => {
    console.log("schedule", userId);
    const [schedule] = await db.query(`
        SELECT s.*, a.name, a.description 
        FROM schedules s 
        JOIN activities a ON s.activity_id = a.id 
        WHERE s.user_id = ?
    `, [userId]);
    return schedule;
};

exports.updateSchedule = async (userId, activity_id, scheduled_time) => {
    // Remove existing schedule for the user
    console.log("data", userId, activity_id, scheduled_time);

    // Insert new schedule
    await db.query('DELETE FROM schedules WHERE user_id = ? and activity_id = ?', [userId, activity_id]);
    //let time = toString(schedule[0].scheduled_time);
    await db.query('INSERT INTO schedules (user_id, activity_id, scheduled_time) VALUES (?, ?, ?)', [userId, activity_id, scheduled_time]);
};

exports.fetchBadges = async (userId) => {
    const [badges] = await db.query('SELECT * FROM badges WHERE challenge_id = ?', [1]); // assuming ID 1 for Plan-a-Day
    return badges;
};
