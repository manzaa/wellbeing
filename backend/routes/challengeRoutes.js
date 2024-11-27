const express = require('express');
const { getChallenge, getTasksByChallengeId, getChallengeByTitle } = require('../controllers/challengeController');
const router = express.Router();

router.get('/roomrescue', getChallengeByTitle);
//router.get('/:id', getChallenge);
//router.get('/:id/tasks', getTasksByChallengeId);

module.exports = router;
