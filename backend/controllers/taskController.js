const db = require('../db');

exports.updateTaskCompletion = async (req, res) => {
    const taskId = req.params.id;
    await db.query('UPDATE tasks SET is_completed = TRUE WHERE id = ?', [taskId]);
    res.json({ message: 'Task marked as completed' });
};
