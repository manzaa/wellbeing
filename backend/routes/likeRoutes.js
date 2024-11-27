const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// Route to like a subtopic
router.post('/topics/:topicId/subtopics/:subtopicId/like', likeController.likeSubtopic);

// Route to get liked topics by user
// router.get('/user/:userId/liked1', likeController.getLikedTopicsByUser);
// New route to get liked subtopics by user and topic
router.get('/user/:userId/topics/:topicId/liked', likeController.getLikedSubtopicsByUserAndTopic);

module.exports = router;
