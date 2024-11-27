// src/components/TopicDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioRecorder from './AudioRecorder';
import AudioPlayer from './AudioPlayer';

function TopicDetails({ match }) {
    const [subtopics, setSubtopics] = useState([]);
    const [audioUrl, setAudioUrl] = useState(null);
    const topicId = match.params.id;

    useEffect(() => {
        axios.get(`/api/topics/${topicId}/subtopics`).then(response => setSubtopics(response.data));
    }, [topicId]);

    const handleSaveAudio = (audioBlob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob);
        formData.append('subtopicId', topicId);

        axios.post('/api/audio/record', formData).then(response => setAudioUrl(response.data.audioUrl));
    };

    return (
        <div>
            <h2>Topic Details</h2>
            <ul>
                {subtopics.map(subtopic => (
                    <li key={subtopic.id}>
                        {subtopic.name}
                        <button>Like</button>
                        <button>Favorite</button>
                        <button>Mark Complete</button>
                    </li>
                ))}
            </ul>
            <AudioRecorder onSave={handleSaveAudio} />
            <AudioPlayer audioUrl={audioUrl} />
        </div>
    );
}

export default TopicDetails;