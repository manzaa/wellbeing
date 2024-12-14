import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const PlanADay = () => {
    const [challenge, setChallenge] = useState(null);
    const [activities, setActivities] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [badges, setBadges] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [scheduledTime, setScheduledTime] = useState('');
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { data: challengeData } = await axios.get(process.env.REACT_APP_API_URL + '/api/planADay/challenge');
            setChallenge(challengeData);

            const { data: activitiesData } = await axios.get(process.env.REACT_APP_API_URL + '/api/planADay/activities');
            setActivities(activitiesData);

            const { data: badgesData } = await axios.get(`${process.env.REACT_APP_API_URL}/api/planADay/badges/${userId}`); //userid
            setBadges(badgesData);

            const { data: scheduleData } = await axios.get(`${process.env.REACT_APP_API_URL}/api/planADay/schedule/${userId}`); //userid
            console.log("schedule data", scheduleData);

            setSchedule(scheduleData);
        };

        fetchData();
    }, [userId]);

    const handleScheduleActivity = (activity) => {
        setSelectedActivity(activity);
        setDialogOpen(true);
    };

    const handleAddToSchedule = async () => {
        const newSchedule = [...schedule, { ...selectedActivity, scheduled_time: scheduledTime }];
        console.log("schedule", schedule, "selected", selectedActivity, "new schedule", newSchedule);
        setSchedule(newSchedule);
        setDialogOpen(false);
        await axios.put(`${process.env.REACT_APP_API_URL}/api/planADay/schedule/${userId}`, { activity_id: selectedActivity.id, scheduled_time: scheduledTime }); //userid
    };

    return (
        <Box sx={{ p: 4 }}>
                     <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>
            <Typography variant="h3" color="primary" textAlign="center" gutterBottom>
                {challenge ? challenge.title : 'Loading...'}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" textAlign="center" mb={3}>
                {challenge ? challenge.description : ''}
            </Typography>

            <Typography variant="h5" color="primary" mt={4}>Today's Activities</Typography>
            <Grid container spacing={3} mt={2}>
                {activities.map((activity) => (
                    <Grid item xs={12} sm={6} md={4} key={activity.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="secondary">{activity.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{activity.description}</Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleScheduleActivity(activity)}
                                    sx={{ mt: 2 }}
                                >
                                    Add to Schedule
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" color="primary" mt={6}>Today's Schedule</Typography>
            <Grid container spacing={3} mt={2}>
                {schedule.map((activity, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{activity.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{activity.scheduled_time}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* <Typography variant="h5" color="primary" mt={6}>Earned Badges</Typography>
            <Grid container spacing={3} mt={2}>
                {badges.map((badge) => (
                    <Grid item xs={6} sm={4} md={3} key={badge.id}>
                        <Avatar src={badge.icon} alt={badge.name} sx={{ width: 64, height: 64, mx: 'auto' }} />
                        <Typography variant="body2" align="center">{badge.name}</Typography>
                    </Grid>
                ))}
            </Grid> */}

            {/* Improved Dialog Structure */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Schedule Activity</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ mt: 2 }}>
                        <Typography variant="h6" color="secondary">{selectedActivity?.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Select a time to schedule this activity.
                        </Typography>
                        <TextField
                            label="Scheduled Time"
                            type="time"
                            fullWidth
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mt: 2 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddToSchedule} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PlanADay;
