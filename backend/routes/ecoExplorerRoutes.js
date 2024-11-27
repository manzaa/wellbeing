const express = require('express');
const { getChallenge, getNatureItems, getSightings, logSighting, getBadges } = require('../controllers/ecoExplorerController');
const router = express.Router();

router.get('/challenge', getChallenge);
router.get('/natureItems', getNatureItems);
router.get('/sightings/:userId', getSightings);
router.post('/sightings/:userId', logSighting);
router.get('/badges/:userId', getBadges);

module.exports = router;
