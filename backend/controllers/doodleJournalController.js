const doodleJournalService = require('../models/doodleJournalService');

exports.getPrompts = async (req, res) => {
    const prompts = await doodleJournalService.fetchPrompts();
    res.json(prompts);
};

exports.submitEntry = async (req, res) => {
    const { userId } = req.params;
    const { prompt_id, entry_type, text_entry, audio_url, drawing_url } = req.body;
    await doodleJournalService.saveEntry(userId, prompt_id, entry_type, text_entry, audio_url, drawing_url);
    res.json({ message: 'Entry submitted successfully' });
};

exports.getEntries = async (req, res) => {
    const { userId } = req.params;
    const entries = await doodleJournalService.fetchEntries(userId);
    res.json(entries);
};

exports.getBadges = async (req, res) => {
    const { userId } = req.params;
    const badges = await doodleJournalService.fetchBadges(userId);
    res.json(badges);
};
