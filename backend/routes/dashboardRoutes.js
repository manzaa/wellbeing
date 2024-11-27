const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { getStats } = require('../controllers/dashboardController');
const router = express.Router();

router.get('/stats', authenticateToken, getStats);

module.exports = router;
