// controllers/topicController.js
const db = require('../config/db');

// Get list of topics
exports.getTopics = async (req, res) => {
    try {
        console.log("gettopics");
        const [topics] = await db.query('SELECT id, title FROM topics');
        res.json({ success: true, data: topics });
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ success: false, message: 'Error fetching topics' });
    }
};

// Get list of subtopics for a specific topic
exports.getSubtopics = async (req, res) => {
    const { topicId } = req.params;
    try {
        const [subtopics] = await db.query('SELECT id, title, description, imageUrl FROM subtopics WHERE topic_id = ?', [topicId]);
        console.log('sub',subtopics);
        res.json({ success: true, data: subtopics });
    } catch (error) {
        console.error('Error fetching subtopics:', error);
        res.status(500).json({ success: false, message: 'Error fetching subtopics' });
    }
};
