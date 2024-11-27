const express = require('express');
const router = express.Router();
const cookingController = require('../controllers/cookingController');

// Endpoint to fetch a random cooking challenge
router.get('/random', cookingController.getRandomChallenge);

module.exports = router;
