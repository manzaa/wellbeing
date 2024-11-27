const db = require('../config/db');

exports.getStats = async (req, res) => {
    try {
        const [topicsCount] = await db.query('SELECT COUNT(*) AS count FROM Topics');
        const [subtopicsCount] = await db.query('SELECT COUNT(*) AS count FROM Subtopics');
        const [likedCount] = await db.query('SELECT COUNT(*) AS count FROM UserActions WHERE liked = 1');
        const [completedCount] = await db.query('SELECT COUNT(*) AS count FROM UserActions WHERE completed = 1');

        res.json({
            topics: topicsCount[0].count,
            subtopics: subtopicsCount[0].count,
            liked: likedCount[0].count,
            completed: completedCount[0].count
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve dashboard statistics' });
    }
};
