import React from 'react';
import { Grid, Paper, Typography, Avatar } from '@mui/material';

const badges = [
    { name: 'Safety Star', color: '#f44336', icon: '/images/safety-star.png' },
    { name: 'Screening Star', color: '#9c27b0', icon: '/images/screening-star.png' },
    { name: 'Chef Badge', color: '#ff9800', icon: '/images/chef-badge.png' },
    { name: 'Explorer', color: '#4caf50', icon: '/images/explorer-badge.png' },
];

function BadgeGrid() {
    return (
        <Grid container spacing={2} sx={{ mt: 4 }}>
            {badges.map((badge, index) => (
                <Grid item xs={6} sm={3} key={index}>
                    <Paper sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundColor: badge.color,
                        color: 'white',
                        padding: 2,
                        borderRadius: 3,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        textAlign: 'center'
                    }}>
                        <Avatar src={badge.icon} sx={{ width: 50, height: 50, mb: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{badge.name}</Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default BadgeGrid;
