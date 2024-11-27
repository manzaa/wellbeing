// models/Topic.js
const db = require('../config/db');

const Topic = {
    getAll: (callback) => {
        db.query('SELECT * FROM topics', callback);
    },

    findById: (topicId, callback) => {
        db.query('SELECT * FROM topics WHERE id = ?', [topicId], callback);
    }
};

module.exports = Topic;