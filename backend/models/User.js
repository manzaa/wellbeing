const db = require('../config/db');

const User = {
    findByUsername: async (username, callback) => {
       db.query('SELECT * FROM users WHERE email = ?', [username], callback);
    },
    create: (username, password, role, callback) => {
        db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], callback);
    }
};

module.exports = User;