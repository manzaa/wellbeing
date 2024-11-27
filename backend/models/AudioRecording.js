// models/Audio.js
const db = require('../config/db');

const AudioRecording = {
    create: async (userId, topicId, subtopicId, audioUrl, callback) => {
        const isThere = await AudioRecording.findOne(userId, topicId, subtopicId);
        console.log("exists", isThere);
        if (isThere.length > 0)
        {
            console.log('update');
            db.query('update audio_recordings set audio_url = ? where user_id = ? and  topic_id = ? and subtopic_id = ?',
                [audioUrl, userId, topicId, subtopicId], callback);
        
        } else {
            console.log('insert');
            db.query('INSERT INTO audio_recordings (user_id, topic_id, subtopic_id, audio_url) VALUES (?, ?, ?, ?)',
                [userId, topicId, subtopicId, audioUrl], callback);
                
        }
    },


    findAll: async (userId, topicId) => {
        const query = `
            SELECT * FROM audio_recordings WHERE topic_id = ? AND user_id = ?
        `;
        const [audios] = await db.query(query, [topicId, userId]);
        return audios;
    },
    // findAll: async (userId, topicId) => {
    //     const audios =  db.query('SELECT * FROM audio_recordings WHERE topic_id = ? AND user_id = ?',
    //         [topicId, userId]);
    
    //         return audios;
    //     }
    findOne: async (userId, topicId, subtopicId) => {
        const query = `
            SELECT * FROM audio_recordings WHERE topic_id = ? AND user_id = ? AND subtopic_id = ?
        `;
        const [audio] = await db.query(query, [topicId, userId, subtopicId]);
        return audio;
    },
};

module.exports = AudioRecording;