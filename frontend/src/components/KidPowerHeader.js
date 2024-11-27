import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';

function KidPowerHeader({ title }) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(to right, #3f51b5, #5c6bc0)',
            color: 'white',
            padding: 2,
            borderRadius: '15px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            animation: 'slideDown 0.6s ease'
        }}>
            <IconButton sx={{ color: 'white' }}><MenuIcon /></IconButton>
            <Typography variant="h4" sx={{ fontFamily: "'Comic Sans MS', sans-serif", fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Button sx={{ color: 'white', fontWeight: 'bold' }} startIcon={<StarIcon />}>Skills</Button>
        </Box>
    );
}

export default KidPowerHeader;
