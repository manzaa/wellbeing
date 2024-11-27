import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/system';

const BadgeCard = styled(Card)(({ theme }) => ({
    minWidth: 180,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
}));

const BadgeAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: '0 auto',
}));

const BadgeDisplay = ({ badges }) => (
    <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" color="primary" gutterBottom>
            Earned Badges
        </Typography>
        <Grid container spacing={3} justifyContent="center">
            {badges.map((badge, index) => (
                <Grid item key={index}>
                    <BadgeCard>
                        <CardContent>
                            <BadgeAvatar src={badge.icon} alt={badge.name}>
                                {badge.icon ? null : badge.name.charAt(0)}
                            </BadgeAvatar>
                            <Typography variant="h6" align="center">
                                {badge.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" align="center">
                                {badge.description}
                            </Typography>
                        </CardContent>
                    </BadgeCard>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default BadgeDisplay;
