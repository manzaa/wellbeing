const express = require('express');
const { getPrompts, submitEntry, getEntries, getBadges } = require('../controllers/doodleJournalController');
const router = express.Router();

router.get('/prompts', getPrompts);
router.post('/entry/:userId', submitEntry);
router.get('/entries/:userId', getEntries);
router.get('/badges/:userId', getBadges);

module.exports = router;
