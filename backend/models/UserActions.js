// models/UserActions.js
const db = require('../config/db');

const UserActions = {
    createAction: (userId, subtopicId, action, callback) => {
        db.query('INSERT INTO user_actions (user_id, subtopic_id, action) VALUES (?, ?, ?)',
            [userId, subtopicId, action], callback);
    },

    findActionsBySubtopicAndUser: (subtopicId, userId, callback) => {
        db.query('SELECT action FROM user_actions WHERE subtopic_id = ? AND user_id = ?',
            [subtopicId, userId], callback);
    }
};

module.exports = UserActions;