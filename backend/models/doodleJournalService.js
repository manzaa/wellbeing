const db = require('../config/db');

exports.fetchPrompts = async () => {
    const [prompts] = await db.query('SELECT * FROM prompts ORDER BY created_at DESC LIMIT 1'); // Fetch latest prompt
    return prompts;
};

exports.saveEntry = async (userId, prompt_id, entry_type, text_entry, audio_url, drawing_url) => {
    await db.query(
        'INSERT INTO journal_entries (user_id, prompt_id, entry_type, text_entry, audio_url, drawing_url) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, prompt_id, entry_type, text_entry, audio_url, drawing_url]
    );
};

exports.fetchEntries = async (userId) => {
    const [entries] = await db.query(`
        SELECT e.*, p.prompt_text 
        FROM journal_entries e 
        JOIN prompts p ON e.prompt_id = p.id 
        WHERE e.user_id = ? ORDER BY e.created_at DESC
    `, [userId]);
    return entries;
};

exports.fetchBadges = async (userId) => {
    const [badges] = await db.query('SELECT * FROM badges'); // Simple static badges, customize as needed
    return badges;
};
