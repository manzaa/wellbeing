const express = require('express');
const router = express.Router();
const letterController = require('../controllers/letterController');

router.get('/:languageId', letterController.getLettersByLanguage);

module.exports = router;
