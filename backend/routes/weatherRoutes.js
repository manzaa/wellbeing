const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/today', weatherController.getTodayWeather);

module.exports = router;
