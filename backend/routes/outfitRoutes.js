const express = require('express');
const router = express.Router();
const outfitController = require('../controllers/outfitController');

router.get('/', outfitController.getAllOutfits);
router.post('/select', outfitController.saveUserOutfitSelection);

module.exports = router;
