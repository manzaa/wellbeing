import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';

const Location = () => {
    const { id } = useParams();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/activities/1`); //locationid
            setActivities(response.data);
        };
        fetchActivities();
    }, [id]);

    const completeActivity = async (activityId) => {
        await axios.post('/api/complete-activity', { userId: 1, locationId: id });
        alert('Activity completed!');
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4">Explore Activities</Typography>
            {activities.map((activity) => (
                <Paper key={activity.id} sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="h6">{activity.name}</Typography>
                    <Typography>{activity.description}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => completeActivity(activity.id)}
                    >
                        Complete
                    </Button>
                </Paper>
            ))}
        </Box>
    );
};

export default Location;
