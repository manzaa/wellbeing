// models/Subtopic.js
const db = require('../config/db');

const Subtopic = {
    findByTopicId: (topicId, callback) => {
        db.query('SELECT * FROM subtopics WHERE topic_id = ?', [topicId], callback);
    },

    findById: (subtopicId, callback) => {
        db.query('SELECT * FROM subtopics WHERE id = ?', [subtopicId], callback);
    }
};

module.exports = Subtopic;