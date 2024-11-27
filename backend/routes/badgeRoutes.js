const express = require('express');
const badgeController = require('../controllers/badgeController');
const { getBadgesByChallengeId, getBadgesByChallengeTitle  } = require('../controllers/badgeController');
const router = express.Router();

// Route to fetch all badges for a user
router.get('/:userId', badgeController.getBadgesByUser);

// Route to add a new badge
router.post('/', badgeController.addBadge);

router.get('/:challengeId', getBadgesByChallengeId);

// Route to fetch badges by "Room Rescue" challenge title
router.get('/roomrescue', getBadgesByChallengeTitle);

module.exports = router;
