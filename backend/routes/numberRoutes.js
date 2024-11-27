const express = require('express');
const router = express.Router();
const { getNumbers } = require('../controllers/numberController');

router.get('/', getNumbers);

module.exports = router;
