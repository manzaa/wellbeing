const express = require('express');
const { getChallenge, getScenarios, submitResponse, getBadges, getScore } = require('../controllers/emergencyController');
const router = express.Router();

router.get('/challenge', getChallenge);
router.get('/scenarios', getScenarios);
router.post('/response/:userId', submitResponse);
router.get('/badges/:userId', getBadges);
router.get('/score/:userId', getScore);

module.exports = router;
