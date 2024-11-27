const Like = require('../models/Like');
const db = require('../config/db');

// Controller to handle liking a subtopic
exports.likeSubtopic = async (req, res) => {
    const { topicId, subtopicId } = req.params;
    const { userId } = req.body;

    try {
        await Like.likeSubtopic(userId, topicId, subtopicId);
        res.status(200).json({ message: 'Subtopic liked successfully' });
    } catch (error) {
        console.error('Error liking subtopic:', error);
        res.status(500).json({ error: 'An error occurred while liking the subtopic' });
    }
};

// Controller to fetch liked topics by user
exports.getLikedTopicsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const likedItems = await Like.getLikedTopicsByUser(userId);
        res.status(200).json(likedItems);
    } catch (error) {
        console.error('Error fetching liked topics:', error);
        res.status(500).json({ error: 'An error occurred while fetching liked topics' });
    }
};

exports.getLikedSubtopicsByUserAndTopic = async (req, res) => {
    const { userId, topicId } = req.params;

    try {
        const likedItems = await Like.getLikedSubtopicsByUserAndTopic(userId, topicId);
        res.status(200).json(likedItems);
    } catch (error) {
        console.error('Error fetching liked topics:', error);
        res.status(500).json({ error: 'An error occurred while fetching liked topics' });
    }
};
// exports.getLikedSubtopicsByUserAndTopic = async (req, res) => {
//     console.log(req.params);
//     const { userId, topicId } = req.params;

//     const query = `
//         SELECT topics.id AS topic_id, topics.title AS topic_name, subtopics.id AS subtopic_id, subtopics.title AS subtopic_name
//         FROM user_actions
//         JOIN topics ON user_actions.topic_id = topics.id
//         LEFT JOIN subtopics ON user_actions.subtopic_id = subtopics.id
//         WHERE user_actions.user_id = ? AND user_actions.topic_id = ? AND user_actions.action = 'like'
//     `;

//     db.query(query, [userId, topicId], (error, results) => {
//         if (error) {
//             return res.status(500).json({ error: 'Database query error' });
//         }
//         return res.status(200).json(results);
//     });



//};

// module.exports = { likeSubtopic, getLikedTopicsByUser, getLikedSubtopicsByUserAndTopic };
