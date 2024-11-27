import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import BadgeIcon from '@mui/icons-material/EmojiEvents';
import axios from 'axios';

const Badges = ({ userId }) => {
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        // Fetch badges from the server
        const fetchBadges = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/badges/${userId}`);
                setBadges(response.data);
            } catch (error) {
                console.error("Error fetching badges", error);
            }
        };
        fetchBadges();
    }, [userId]);

    return (
        <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Your Earned Badges</Typography>
            <Grid container spacing={2}>
                {badges.map((badge) => (
                    <Grid item xs={12} sm={6} md={4} key={badge.id}>
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: '#FFF3E0' }}>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                <BadgeIcon />
                            </Avatar>
                            <CardContent>
                                <Typography variant="h6">{badge.badge_name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Earned on: {new Date(badge.date_earned).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Badges;
