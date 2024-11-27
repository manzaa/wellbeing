const express = require('express');
const router = express.Router();
const { getTopics, getResponse } = require('../controllers/wellbeingController');

router.get('/topics', getTopics);
router.post('/response', getResponse);  // POST to handle AI-like query response

module.exports = router;
