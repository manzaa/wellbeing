import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Grid, Card, CardContent, Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle 
} from '@mui/material';
import axios from 'axios';

const MyFeelingsFriend = ({ userId }) => {
    const [challenge, setChallenge] = useState(null);
    const [emotions, setEmotions] = useState([]);
    const [logs, setLogs] = useState([]);
    const [badges, setBadges] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const { data: challengeData } = await axios.get(process.env.REACT_APP_API_URL + '/api/feelingsFriend/challenge');
            setChallenge(challengeData);

            const { data: emotionsData } = await axios.get(process.env.REACT_APP_API_URL + '/api/feelingsFriend/emotions');
            setEmotions(emotionsData);

            const { data: badgesData } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feelingsFriend/badges/${userId}`);
            setBadges(badgesData);

            const { data: logsData } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feelingsFriend/logs/${userId}`);
            setLogs(logsData);
        };

        fetchData();
    }, [userId]);

    const handleLogEmotion = (emotion) => {
        setSelectedEmotion(emotion);
        setDialogOpen(true);
    };

    const handleAddLog = async () => {
        await axios.post(`/api/feelingsFriend/logs/${userId}`, { emotion_id: selectedEmotion.id, comment });
        setDialogOpen(false);
        setComment('');
        const { data: logsData } = await axios.get(`/api/feelingsFriend/logs/${userId}`);
        setLogs(logsData);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" color="primary" textAlign="center" gutterBottom>
                {challenge ? challenge.title : 'Loading...'}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" textAlign="center" mb={3}>
                {challenge ? challenge.description : ''}
            </Typography>

            <Typography variant="h5" color="primary" mt={4}>Today's Emotion Check-In</Typography>
            <Grid container spacing={3} mt={2}>
                {emotions.map((emotion) => (
                    <Grid item xs={12} sm={6} md={4} key={emotion.id}>
                        <Card>
                            <CardContent>
                                <Avatar src={emotion.icon} alt={emotion.name} sx={{ width: 56, height: 56, mx: 'auto' }} />
                                <Typography variant="h6" color="secondary" align="center">{emotion.name}</Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleLogEmotion(emotion)}
                                    sx={{ mt: 2 }}
                                    fullWidth
                                >
                                    Log Emotion
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" color="primary" mt={6}>Recent Emotional Logs</Typography>
            <Grid container spacing={3} mt={2}>
                {logs.map((log) => (
                    <Grid item xs={12} sm={6} md={4} key={log.id}>
                        <Card>
                            <CardContent>
                                <Avatar src={log.emotion_icon} alt={log.emotion_name} sx={{ width: 56, height: 56, mx: 'auto' }} />
                                <Typography variant="h6" color="secondary" align="center">{log.emotion_name}</Typography>
                                <Typography variant="body2" color="textSecondary" align="center">{log.date}</Typography>
                                <Typography variant="body2" color="textSecondary" align="center">{log.comment}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" color="primary" mt={6}>Earned Badges</Typography>
            <Grid container spacing={3} mt={2}>
                {badges.map((badge) => (
                    <Grid item xs={6} sm={4} md={3} key={badge.id}>
                        <Avatar src={badge.icon} alt={badge.name} sx={{ width: 64, height: 64, mx: 'auto' }} />
                        <Typography variant="body2" align="center">{badge.name}</Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Emotion Log Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Log Your Emotion</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Comment"
                        fullWidth
                        multiline
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddLog} color="primary">
                        Log Emotion
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyFeelingsFriend;
