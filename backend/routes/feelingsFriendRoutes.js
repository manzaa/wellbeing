const express = require('express');
const { getChallenge, getEmotions, getEmotionalLogs, logEmotion, getBadges } = require('../controllers/feelingsFriendController');
const router = express.Router();

router.get('/challenge', getChallenge);
router.get('/emotions', getEmotions);
router.get('/logs/:userId', getEmotionalLogs);
router.post('/logs/:userId', logEmotion);
router.get('/badges/:userId', getBadges);

module.exports = router;
