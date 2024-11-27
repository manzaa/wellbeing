// controllers/audioController.js
const AudioRecording = require('../models/AudioRecording');

// Create a new audio recording
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

// Ensure the uploads directory exists
const uploadDirectory = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

exports.createAudioRecording = async (req, res) => {
    try {
        // Ensure file is provided
        if (!req.file) {
            return res.status(400).json({ error: 'Audio file is required' });
        }

        let user_id = req.body['userId'];
        let topic_id = req.body['topicId'];
        let subtopic_id = req.body['subtopicId'];
        // Process file and save to disk
        const audioFilename = `${Date.now()}_${req.file.originalname}`;
        const filePath = path.join(uploadDirectory, audioFilename);
        
        // Save file from buffer to disk
        fs.writeFileSync(filePath, req.file.buffer);

        // Construct the URL path to access the file
        const audio_url = `http://localhost:5000/uploads/${audioFilename}`;

        // Save recording metadata and file path to database
        const newAudio = await AudioRecording.create(
            user_id,
            topic_id,
            subtopic_id,
            audio_url,
        );

        res.status(201).json({ message: 'Audio recording created successfully', data: newAudio });
    } catch (error) {
        console.error('Error creating audio recording:', error);
        res.status(500).json({ error: 'Failed to create audio recording' });
    }
};

// Fetch audio recordings by topic or subtopic
exports.getAudioRecordings = async (req, res) => {
    const { topicId, userId } = req.query;
    try {
        const whereClause = {};
        // if (topic_id) whereClause.topic_id = topic_id;
        // if (user_id) whereClause.subtopic_id = subtopic_id;

        const recordings = await AudioRecording.findAll(userId, topicId);
        console.log("recording", recordings);
        res.setHeader('Content-Type', 'audio/webm');  // Set correct MIME type
        res.status(200).json({ data: recordings });
    } catch (error) {
        console.error('Error fetching audio recordings:', error);
        res.status(500).json({ error: 'Failed to fetch audio recordings' });
    }
};

// Fetch audio recordings by topic or subtopic
exports.getSubtopicAudioRecording = async (req, res) => {
    const { topicId, userId, subtopicId } = req.query;
    try {
        const recording = await AudioRecording.findOne(userId, topicId, subtopicId);
        console.log("getSubtopicAudioRecording", recording);
        res.setHeader('Content-Type', 'audio/webm');  // Set correct MIME type
        res.status(200).json({ data: recording });
    } catch (error) {
        console.error('Error fetching audio recordings:', error);
        res.status(500).json({ error: 'Failed to fetch audio recording' });
    }
};
