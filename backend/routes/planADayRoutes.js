const express = require('express');
const { getChallenge, getActivities, getSchedule, updateSchedule, getBadges } = require('../controllers/planADayController');
const router = express.Router();

router.get('/challenge', getChallenge);
router.get('/activities', getActivities);
router.get('/schedule/:userId', getSchedule);
router.put('/schedule/:userId', updateSchedule);
router.get('/badges/:userId', getBadges);

module.exports = router;
