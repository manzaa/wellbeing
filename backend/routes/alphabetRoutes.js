const express = require('express');
const router = express.Router();
const { getAlphabets } = require('../controllers/alphabetController');

router.get('/', getAlphabets);

module.exports = router;
