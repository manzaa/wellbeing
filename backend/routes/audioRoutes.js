// routes/audioRoutes.js
const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

// Route to create a new audio recording
// router.post('/audio/user/:userId/topics/:topicId/subtopics/:subtopicsId', audioController.createAudioRecording);

router.post('/', upload.single('audio'), audioController.createAudioRecording);

// Route to get all audio recordings by topic or subtopic
router.get('/', audioController.getAudioRecordings);

router.get('/fetchAudio', audioController.getSubtopicAudioRecording);

// // Route to get all audio recordings by topic or subtopic
// router.get('/', audioController.getAudioRecordings);

module.exports = router;
