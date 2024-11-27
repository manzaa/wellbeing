const db = require('../config/db');

exports.getAllChores = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM chores');
        res.json({ chores: results });
    } catch (error) {
        console.error('Error fetching chores:', error);
        res.status(500).json({ error: 'Error fetching chores' });
    }
};

exports.completeChore = async (req, res) => {
    const { userId, choreId } = req.body;
    const today = new Date().toISOString().split('T')[0];

    try {
        await db.query(
            'INSERT INTO user_chores (user_id, chore_id, completed_on) VALUES (?, ?, ?)',
            [userId, choreId, today]
        );
        res.json({ message: 'Chore completed successfully' });
    } catch (error) {
        console.error('Error completing chore:', error);
        res.status(500).json({ error: 'Error completing chore' });
    }
};
