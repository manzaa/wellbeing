const express = require('express');
const { updateTaskCompletion } = require('../controllers/taskController');
const router = express.Router();

router.put('/:id/complete', updateTaskCompletion);

module.exports = router;
