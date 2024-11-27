const express = require('express');
const router = express.Router();
const choreController = require('../controllers/choreController');

router.get('/', choreController.getAllChores);
router.post('/complete', choreController.completeChore);

module.exports = router;
