import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

function ChallengeCard({ title, description, icon, bgColor }) {
    return (
        <Card sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 2,
            backgroundColor: bgColor,
            borderRadius: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            animation: 'popUp 0.5s ease',
            '&:hover': { transform: 'scale(1.05)', transition: '0.3s' }
        }}>
            <Avatar src={icon} sx={{ width: 70, height: 70, mr: 2, boxShadow: '0px 4px 8px rgba(0,0,0,0.3)' }} />
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{title}</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>{description}</Typography>
            </CardContent>
        </Card>
    );
}

export default ChallengeCard;
