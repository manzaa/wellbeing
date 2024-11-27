const express = require('express');
const { getChallenge, getTasks, getItems, getBadges } = require('../controllers/budgetBuddyController');
const router = express.Router();

router.get('/challenge', getChallenge);
router.get('/tasks', getTasks);
router.get('/items/:challengeId', getItems);
router.get('/badges', getBadges);

module.exports = router;
