const db = require('../config/db');

exports.getChallenge = async (req, res) => {
    console.log("challenge");
    const challengeId = req.params.id;
    const [challenge] = await db.query('SELECT * FROM challenges WHERE id = ?', [challengeId]);
    if (challenge.length > 0) {
        res.json(challenge[0]);
    } else {
        res.status(404).json({ message: 'Challenge not found' });
    }
};

exports.getTasksByChallengeId = async (req, res) => {
    const challengeId = req.params.id;
    const [tasks] = await db.query('SELECT * FROM tasks WHERE challenge_id = ?', [challengeId]);
    res.json(tasks);
};


// Fetch "Room Rescue" challenge by title
exports.getChallengeByTitle = async (req, res) => {
    console.log("by title");
    const [challenge] = await db.query('SELECT * FROM challenges WHERE title = ?', ['Room Rescue']);
    
    if (challenge.length > 0) {
        const challengeId = challenge[0].id;
        const [tasks] = await db.query('SELECT * FROM tasks WHERE challenge_id = ?', [challengeId]);
        res.json({ challenge: challenge[0], tasks });
    } else {
        res.status(404).json({ message: 'Room Rescue challenge not found' });
    }
};