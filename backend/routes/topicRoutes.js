// routes/topicRoutes.js
const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Get list of topics
router.get('/topics', topicController.getTopics);

// Get list of subtopics for a specific topic
router.get('/topics/:topicId/subtopics', topicController.getSubtopics);

module.exports = router;
