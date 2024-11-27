const badgeService = require('../models/badgeService');

// Controller to get badges for a user
exports.getBadgesByUser = async (req, res) => {
    console.log("user");
    const userId = req.params.userId;
    try {
        const badges = await badgeService.getBadgesByUser(userId);
        res.json(badges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to add a new badge
exports.addBadge = async (req, res) => {
    console.log("post");
    const { userId, badgeName } = req.body;
    try {
        await badgeService.addBadge(userId, badgeName);
        res.json({ message: 'Badge added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBadgesByChallengeId = async (req, res) => {
    const challengeId = req.params.challengeId;
    const [badges] = await db.query('SELECT * FROM badges WHERE challenge_id = ?', [challengeId]);
    res.json(badges);
};

// Fetch badges for the "Room Rescue" challenge by title
exports.getBadgesByChallengeTitle = async (req, res) => {
    const [challenge] = await db.query('SELECT id FROM challenges WHERE title = ?', ['Room Rescue']);
    
    if (challenge.length > 0) {
        const challengeId = challenge[0].id;
        const [badges] = await db.query('SELECT * FROM badges WHERE challenge_id = ?', [challengeId]);
        res.json(badges);
    } else {
        res.status(404).json({ message: 'Badges for Room Rescue challenge not found' });
    }
};
