import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Paper, Button, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const HomeHelper = () => {
    const [chores, setChores] = useState([]);
    const [completedChores, setCompletedChores] = useState([]);
    const [stars, setStars] = useState(0);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        fetchChores();
    }, []);

    const fetchChores = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/api/chores');
            setChores(response.data.chores);
        } catch (error) {
            console.error('Error fetching chores:', error);
        }
    };

    const completeChore = async (chore) => {
        try {
            await axios.post(process.env.REACT_APP_API_URL + '/api/chores/complete', {
                userId: 1, // Replace with actual user ID
                choreId: chore.id
            });
            setCompletedChores([...completedChores, chore.id]);
            setStars(stars + chore.reward);
        } catch (error) {
            console.error('Error completing chore:', error);
        }
    };

    return (
        <Container>
                                 <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>

            <Typography variant="h4" color="primary" textAlign="center" sx={{ mb: 4 }}>
                Home Helper - Chore Star Challenge
            </Typography>

            <Typography variant="h6" textAlign="center" sx={{ mb: 4 }}>
                Earn stars by completing chores!
            </Typography>

            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h6" color="secondary">
                    Stars Earned: {stars} ⭐
                </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center">
                {chores.map((chore) => (
                    <Grid item xs={12} sm={6} md={4} key={chore.id}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        >
                            <Paper
                                elevation={completedChores.includes(chore.id) ? 1 : 3}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    borderRadius: 3,
                                    backgroundColor: completedChores.includes(chore.id) ? '#e0e0e0' : '#fff'
                                }}
                            >
                                <Avatar
                                    src={chore.icon_url}
                                    alt={chore.name}
                                    sx={{ width: 70, height: 70, mb: 2, mx: 'auto' }}
                                />
                                <Typography variant="h6" gutterBottom>
                                    {chore.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                    {chore.description}
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => completeChore(chore)}
                                    disabled={completedChores.includes(chore.id)}
                                    sx={{ mt: 1 }}
                                >
                                    {completedChores.includes(chore.id) ? 'Completed' : `Earn ${chore.reward} ⭐`}
                                </Button>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomeHelper;
