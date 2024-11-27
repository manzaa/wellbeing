import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import CanvasDraw from 'react-canvas-draw';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const DoodleJournal = () => {
    const [prompt, setPrompt] = useState('');
    const [entries, setEntries] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [entryType, setEntryType] = useState('');
    const [textEntry, setTextEntry] = useState('');
    const [audioURL, setAudioURL] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const prompts = [
        "Draw or write about your favorite memory.",
        "Describe or doodle something that made you smile today.",
        "What do you want to learn tomorrow?",
        "Draw something you saw outside.",
        "Write or draw something you’re grateful for."
    ];

    const userId = sessionStorage.getItem('userId');
    // Key for each user's journal data
    const storageKey = `doodleJournalData_${userId}`;

    useEffect(() => {
        const today = new Date().toDateString();
        const storedData = JSON.parse(sessionStorage.getItem(storageKey));

        if (!storedData || storedData.date !== today) {
            const initialData = {
                date: today,
                prompt: prompts[Math.floor(Math.random() * prompts.length)],
                entries: []
            };
            sessionStorage.setItem(storageKey, JSON.stringify(initialData));
            setPrompt(initialData.prompt);
            setEntries([]);
        } else {
            setPrompt(storedData.prompt);
            setEntries(storedData.entries);
        }
    }, [userId, storageKey]);

    const saveToSession = (newEntries) => {
        const today = new Date().toDateString();
        const updatedData = {
            date: today,
            prompt,
            entries: newEntries
        };
        sessionStorage.setItem(storageKey, JSON.stringify(updatedData));
    };

    const handleAddEntry = () => {
        const newEntry = {
            id: Date.now(),
            type: entryType,
            text: entryType === 'text' ? textEntry : '',
            audio: entryType === 'audio' ? audioURL : '',
            drawing: entryType === 'draw' && canvasRef.current ? canvasRef.current.canvasContainer.children[1].toDataURL() : ''
        };

        const newEntries = [...entries, newEntry];
        setEntries(newEntries);
        saveToSession(newEntries);
        setDialogOpen(false);
        setTextEntry('');
        setAudioURL('');
    };

    const startRecording = () => {
        setIsRecording(true);
        audioChunks.current = [];
        
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.ondataavailable = (event) => {
                    audioChunks.current.push(event.data);
                };
                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp3' });
                    const audioURL = URL.createObjectURL(audioBlob);
                    setAudioURL(audioURL);
                };
                mediaRecorderRef.current.start();
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
                setIsRecording(false);
            });
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>
            <Typography variant="h3" color="primary" textAlign="center" gutterBottom>
                Doodle Journal
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" textAlign="center" mb={3}>
                {prompt}
            </Typography>

            <Grid container spacing={3} justifyContent="center" mt={4}>
                <Button variant="contained" color="primary" onClick={() => { setDialogOpen(true); setEntryType('text'); }}>
                    Add Text Entry
                </Button>
                <Button variant="contained" color="secondary" onClick={() => { setDialogOpen(true); setEntryType('draw'); }}>
                    Add Drawing
                </Button>
                <Button variant="contained" color="success" onClick={() => { setDialogOpen(true); setEntryType('audio'); }}>
                    Add Audio Entry
                </Button>
            </Grid>

            <Typography variant="h5" color="primary" mt={6}>Journal Entries</Typography>
            <Grid container spacing={3} mt={2}>
                {entries.map((entry) => (
                    <Grid item xs={12} sm={6} md={4} key={entry.id}>
                        <Card>
                            <CardContent>
                                {entry.type === 'text' && (
                                    <Typography variant="body2" color="textSecondary">{entry.text}</Typography>
                                )}
                                {entry.type === 'draw' && entry.drawing && (
                                    <img src={entry.drawing} alt="drawing" style={{ width: '100%', maxHeight: 200 }} />
                                )}
                                {entry.type === 'audio' && entry.audio && (
                                    <audio controls src={entry.audio}>Audio not supported</audio>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>{`Add ${entryType.charAt(0).toUpperCase() + entryType.slice(1)} Entry`}</DialogTitle>
                <DialogContent>
                    {entryType === 'text' && (
                        <TextField
                            label="Write your thoughts"
                            fullWidth
                            multiline
                            rows={4}
                            value={textEntry}
                            onChange={(e) => setTextEntry(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                    )}
                    {entryType === 'draw' && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <CanvasDraw ref={canvasRef} brushColor="#000" lazyRadius={0} brushRadius={2} canvasWidth={300} canvasHeight={200} />
                        </Box>
                    )}
                    {entryType === 'audio' && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
                            {!isRecording ? (
                                <Button variant="contained" color="primary" onClick={startRecording}>
                                    Start Recording
                                </Button>
                            ) : (
                                <Button variant="contained" color="secondary" onClick={stopRecording}>
                                    Stop Recording
                                </Button>
                            )}
                            {audioURL && <audio controls src={audioURL} />}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleAddEntry} color="primary">Save Entry</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DoodleJournal;
