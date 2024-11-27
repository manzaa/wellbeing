// src/components/AudioPlayer.js
import React from 'react';

function AudioPlayer({ audioUrl }) {
    return (
        <div>
            {audioUrl ? <audio controls src={audioUrl} /> : <p>No audio available</p>}
        </div>
    );
}

export default AudioPlayer;