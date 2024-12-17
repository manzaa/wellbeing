import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    CircularProgress,
    Button
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Lame from 'lamejs';
import WavEncoder from 'wav-encoder';
import { FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = new FFmpeg({ log: true });
const MAX_RECORDING_TIME = 60;

const AudioRecorder = ({ userId, topicId, subtopicId, onRecordingComplete }) => {
    const [open, setOpen] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioURL, setAudioURL] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isConverting, setIsConverting] = useState(false);
    const timerRef = useRef(null);
    const audioChunksRef = useRef([]); // Store chunks outside of state to persist data
    const [subtopicAudio, setSubtopicAudio] = useState(''); // to hold the audio URL for the subtopic
        // Use a local array to accumulate audio chunks
        //const audioChunksRef = useRef([]);
    // useEffect(() => {
    //     const initializeRecorder = async () => {
    //         try {
    //             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //             const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    //             recorder.ondataavailable = (e) => {
    //                 if (e.data && e.data.size > 0) {
    //                     console.log("recording....", recorder, e);
    //                     audioChunksRef.current.push(e.data);
    //                     //setAudioChunks((prev) => [...prev, e.data]);
    //                 }
    //             };
    //             console.log(audioChunks);
    //             recorder.onstop = async () => {
    //                 if (audioChunksRef.current.length > 0) {
    //                     console.log("audioChunks", audioChunksRef.current);
    //                 const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    //                 if (audioBlob.size === 0) {
    //                     console.log('Recording error: Empty audio blob');
    //                     return;
    //                 }
    //                 setIsConverting(true);
    //                 //const url = await convertToMP3(audioBlob);
    //                 //console.log("url", url);
    //                 setIsConverting(false);
    //                 //setAudioURL(url);
    //                 await uploadRecording(audioBlob);
    //                 await fetchSubtopicAudio();
    //                 //onRecordingComplete(url);
    //                 } else {
    //                     console.log('Recording error: No audio chunks available');
    //                 }
    //             };
    //             recorder.onerror = (error) => {
    //                 console.error('Recording error:', error);
    //             };
    //             setMediaRecorder(recorder);
    //         } catch (error) {
    //             console.error('Microphone permission denied:', error);
    //         }
    //     };

    //     initializeRecorder();
    // }, []);

    useEffect(() => {
        const initializeRecorder = async () => {
            try {
                // Step 1: Check for media device support
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    console.error('MediaRecorder not supported in this browser');
                    alert('Your browser does not support audio recording.');
                    return;
                }
    
                // Step 2: Request microphone access
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
                // Step 3: Select a compatible MIME type for recording
                let mimeType = '';
                if (MediaRecorder.isTypeSupported('audio/webm')) {
                    mimeType = 'audio/webm';
                } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                    mimeType = 'audio/mp4';
                } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
                    mimeType = 'audio/ogg';
                } else {
                    console.error('No supported MIME type found for recording');
                    alert('Audio recording is not supported on this browser.');
                    return;
                }
    
                // Step 4: Initialize MediaRecorder
                const recorder = new MediaRecorder(stream, { mimeType });
                console.log('Initialized recorder with MIME type:', mimeType);
    
                recorder.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) {
                        audioChunksRef.current.push(e.data);
                    }
                };
    
                recorder.onstop = async () => {
                    if (audioChunksRef.current.length > 0) {
                        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                        console.log('Audio Blob created:', audioBlob);
    
                        if (audioBlob.size > 0) {
                            setIsConverting(true);
                            await uploadRecording(audioBlob);
                            await fetchSubtopicAudio();
                            setIsConverting(false);
                        } else {
                            console.error('Recording error: Empty audio blob');
                        }
                    }
                };
    
                setMediaRecorder(recorder);
            } catch (error) {
                console.error('Error initializing recorder:', error);
                alert('Failed to access the microphone. Please check permissions.');
            }
        };
    
        initializeRecorder();
    }, []);
    
    const handlePlayAudio = async () => {
        if (!subtopicAudio) {
            console.error('No audio URL available to play');
            return;
        }
    
        try {
            // Ensure playback is triggered by a user gesture
            const response = await fetch(subtopicAudio);
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
    
            // Use AudioContext to ensure playback works on mobile
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const responseBuffer = await audioBlob.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(responseBuffer);
    
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
    
            // Start playback
            source.start(0);
            console.log('Audio is playing...');
        } catch (error) {
            console.error('Error playing audio:', error);
            alert('Audio playback failed. Please try again.');
        }
    };
    

    const openDialog = () => setOpen(true);

    const closeDialog = () => {
        setOpen(false);
        resetRecording();
    };

    const resetRecording = () => {
        setIsRecording(false);
        setIsPaused(false);
        setAudioChunks([]); // Clear audio chunks to reset recording
        audioChunksRef.current = []; // Clear chunks after stopping
        setAudioURL(''); // Clear audio URL to reset state
        setRecordingTime(0);
        clearInterval(timerRef.current);
    };

    const startRecording = () => {
        resetRecording();
        if (mediaRecorder) {
            setIsRecording(true);
            setIsPaused(false);
            setAudioChunks([]); // Reset audio chunks for new recording
            setRecordingTime(0);
            mediaRecorder.start();
            timerRef.current = setInterval(() => {
                setRecordingTime((prevTime) => {
                    if (prevTime >= MAX_RECORDING_TIME) {
                        stopRecording();
                        return MAX_RECORDING_TIME;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        }
    };

    const pauseRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
            setIsPaused(true);
            clearInterval(timerRef.current);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
            setIsPaused(false);
            timerRef.current = setInterval(() => {
                setRecordingTime((prevTime) => {
                    if (prevTime >= MAX_RECORDING_TIME) {
                        stopRecording();
                        return MAX_RECORDING_TIME;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused')) {
            mediaRecorder.stop();
            setIsRecording(false);
            setIsPaused(false);
            clearInterval(timerRef.current);
        }
    };

    // const convertToMP3 = async (audioBlob) => {
    //     try {
    //         // Convert Blob to ArrayBuffer
    //         const arrayBuffer = await audioBlob.arrayBuffer();

    //         // Decode the audio blob to PCM samples (16-bit integer)
    //         const wavData = await WavEncoder.encode(arrayBuffer);
    //         const samples = wavData.channelData[0]; // Assuming mono audio

    //         // Initialize LAME encoder with 1 channel, 44.1 kHz, and 128 kbps
    //         const mp3Encoder = new Lame.Mp3Encoder(1, 44100, 128);
    //         const mp3Data = [];

    //         // Encode the WAV data in chunks
    //         const samplesPerChunk = 1152;
    //         for (let i = 0; i < samples.length; i += samplesPerChunk) {
    //             const chunk = samples.subarray(i, i + samplesPerChunk);
    //             const mp3Chunk = mp3Encoder.encodeBuffer(chunk);
    //             if (mp3Chunk.length > 0) {
    //                 mp3Data.push(mp3Chunk);
    //             }
    //         }

    //         // Finalize encoding to ensure all data is included
    //         const endData = mp3Encoder.flush();
    //         if (endData.length > 0) mp3Data.push(endData);

    //         // Create a Blob from the MP3 data
    //         const mp3Blob = new Blob(mp3Data, { type: 'audio/mpeg' });

    //         // Validate Blob
    //         if (mp3Blob.size === 0) throw new Error('Failed to create MP3 Blob: Blob is empty');

    //         return URL.createObjectURL(mp3Blob);
    //     } catch (error) {
    //         console.error('Error during MP3 conversion:', error);
    //         return null; // Return null on error
    //     }
    // };

        // *** Fetch updated audios for the topic/subtopic ***
    const fetchSubtopicAudio = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/audio/fetchAudio?userId=${userId}&topicId=${topicId}&subtopicId=${subtopicId}`
            );
            if (response.data && response.data.data[0].audio_url) {
                setSubtopicAudio(response.data.data[0].audio_url); // Store the audio URL
            }
        } catch (error) {
            console.error('Error fetching subtopic audio:', error);
        }
    };
    
    
    const convertToMP3 = async (audioBlob) => {
        try {
        await ffmpeg.load();
        
        // Create a file in the virtual filesystem
        await ffmpeg.writeFile( 'input.webm', new Uint8Array(await audioBlob.arrayBuffer()));
        
        // Run the conversion command
        await ffmpeg.exec(['-i', 'input.webm', 'output.mp3']);

        // Read the result
        const data = await ffmpeg.readFile('output.mp3');
        console.log("data", data);
        // Create a blob URL for the MP3 file
        const mp3Blob = new Blob([data.buffer], { type: 'audio/mp3' });
        const mp3Url = URL.createObjectURL(mp3Blob);
        return mp3Url; // Use this URL to play or download the MP3
        } catch (error) {
            console.error('Error during MP3 conversion:', error);
            return null;
        } finally {
            // Clean up
            ffmpeg.deleteFile('input.webm');
            ffmpeg.deleteFile('output.mp3');
        }
    };
    
    const uploadRecording = async (mp3Blob) => {
        const formData = new FormData();
        formData.append('audio', mp3Blob, 'recording.webm');
        formData.append('userId', userId);
        formData.append('topicId', topicId);
        formData.append('subtopicId', subtopicId);

        try {
            await axios.post(process.env.REACT_APP_API_URL + '/api/audio', formData);
            console.log('Recording uploaded successfully');
        } catch (error) {
            console.error('Error uploading recording:', error);
        }
    };

    const recordingProgress = (recordingTime / MAX_RECORDING_TIME) * 100;

    return (
        <Box>
            <Button onClick={openDialog} variant="contained" startIcon={<MicIcon />}>
                Record Audio
            </Button>

            <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth>
                <DialogContent>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
                        <Typography variant="h6" gutterBottom>Audio Recorder</Typography>
                        <Box position="relative" display="flex" justifyContent="center" alignItems="center" mb={2}>
                            <CircularProgress
                                variant="determinate"
                                value={recordingProgress}
                                size={120}
                                thickness={5}
                                sx={{ color: isRecording ? 'primary.main' : 'grey.300' }}
                            />
                            <IconButton
                                onClick={isRecording ? (isPaused ? resumeRecording : pauseRecording) : startRecording}
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                    backgroundColor: isRecording ? 'secondary.main' : 'primary.main',
                                    color: 'white',
                                    width: 60,
                                    height: 60,
                                }}
                            >
                                {isRecording ? (isPaused ? <MicIcon /> : <PauseIcon />) : <MicIcon />}
                            </IconButton>
                        </Box>
                        <Typography>{isRecording ? (isPaused ? 'Paused' : 'Recording...') : 'Click to start recording'}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {`Time: ${Math.floor(recordingTime / 60)}:${String(recordingTime % 60).padStart(2, '0')} / 1:00`}
                        </Typography>
                        {isConverting && <Typography variant="body2">Converting to MP3...</Typography>}
                    </Box>
                </DialogContent>

                <DialogActions>
                    {isRecording && (
                        <Button onClick={stopRecording} startIcon={<StopIcon />} color="error">
                            Stop
                        </Button>
                    )}
                    <Button onClick={closeDialog} startIcon={<CloseIcon />}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {subtopicAudio && (
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <IconButton onClick={handlePlayAudio} color="success">
                        <PlayArrowIcon />
                    </IconButton>
                    <Typography variant="body2">Audio Recorded Now</Typography>
                </Box>
            )}
        </Box>
    );
};

export default AudioRecorder;
