const db = require('../config/db');

const Like = {
    // Method to add or update a like action
    likeSubtopic: async (userId, topicId, subtopicId) => {
        const queryCount = `
            select count(*) as count from user_actions where user_id = ? and topic_id = ? and  subtopic_id = ? and  action = 'like'; 
        `;
        const [count] = await db.query(queryCount, [userId, topicId, subtopicId]);
        console.log("count", count[0]);
        if (count[0].count > 0) {
            console.log('update');
            const query = `
            update user_actions set action = '' where user_id = ? and topic_id = ? and subtopic_id = ?
        `;
        await db.query(query, [userId, topicId, subtopicId]);
        } else {
            console.log('insert');
            const query = `
            INSERT INTO user_actions (user_id, topic_id, subtopic_id, action)
            VALUES (?, ?, ?, 'like')
            ON DUPLICATE KEY UPDATE action='like'
        `;
        await db.query(query, [userId, topicId, subtopicId]);
        }
    },

    // Method to fetch liked topics and subtopics for a specific user
    getLikedTopicsByUser: async (userId) => {
        const query = `
            SELECT topics.id AS topic_id, topics.title AS topic_name, subtopics.id AS subtopic_id, subtopics.title AS subtopic_name
            FROM user_actions
            JOIN topics ON user_actions.topic_id = topics.id
            LEFT JOIN subtopics ON user_actions.subtopic_id = subtopics.id
            WHERE user_actions.user_id = ? AND user_actions.action = 'like'
        `;
        const [likedItems] = await db.query(query, [userId]);
        return likedItems;
    },

    // Method to fetch liked topics and subtopics for a specific user
    getLikedSubtopicsByUserAndTopic: async (userId, topicId) => {
        const query = `
            SELECT topics.id AS topic_id, topics.title AS topic_name, subtopics.id AS subtopic_id, subtopics.title AS title
            FROM user_actions
            JOIN topics ON user_actions.topic_id = topics.id
            LEFT JOIN subtopics ON user_actions.subtopic_id = subtopics.id
            WHERE user_actions.user_id = ? AND user_actions.topic_id = ? AND user_actions.action = 'like'
        `;
        const [likedItems] = await db.query(query, [userId, topicId]);
        return likedItems;
    }
};

module.exports = Like;
