import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Grid, Card, CardContent, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle 
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const Emergency101 = () => {
    const [challenge, setChallenge] = useState(null);
    const [scenarios, setScenarios] = useState([]);
    const [badges, setBadges] = useState([]);
    const [score, setScore] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
console.log('user', userId);
    useEffect(() => {
        const fetchData = async () => {
            const { data: challengeData } = await axios.get(process.env.REACT_APP_API_URL + '/api/emergency101/challenge');
            setChallenge(challengeData);

            const { data: scenariosData } = await axios.get(process.env.REACT_APP_API_URL + '/api/emergency101/scenarios');
            setScenarios(scenariosData);

            const { data: badgesData } = await axios.get(`${process.env.REACT_APP_API_URL}/api/emergency101/badges/${userId}`);
            setBadges(badgesData);

            const { data: scoreData } = await axios.get(`${process.env.REACT_APP_API_URL}/api/emergency101/score/${userId}`);
            setScore(scoreData);
        };

        fetchData();
    }, []);

    const handleSelectScenario = (scenario) => {
        setSelectedScenario(scenario); // Set selected scenario
        console.log(selectedScenario);
    };

    useEffect(() => {
        // Open dialog only after selectedScenario is set
        if (selectedScenario) {
            setDialogOpen(true);
        }
    }, [selectedScenario]);

    const handleSubmitAction = async (action) => {
        setSelectedAction(action);
        const { data: result } = await axios.post(`${process.env.REACT_APP_API_URL}/api/emergency101/response/${userId}`, { scenario_id: selectedScenario.id, action_id: action.id });
        setDialogOpen(false);
        setScore(result.score + score);
        setSelectedScenario(null); // Clear selectedScenario after action
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

            <Typography variant="h5" color="primary" mt={4}>Safety Scenarios</Typography>
            <Grid container spacing={3} mt={2}>
                {scenarios.map((scenario) => (
                    <Grid item xs={12} sm={6} md={4} key={scenario.id}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Card onClick={() => handleSelectScenario(scenario)}>
                                <CardContent>
                                    <Typography variant="h6" color="secondary" align="center">{scenario.description}</Typography>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Select Scenario
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>{selectedScenario ? selectedScenario.description : ''}</DialogTitle>
                <DialogContent>
                    {selectedScenario && selectedScenario.actions.map((action) => (
                        <Button
                            key={action.id}
                            variant="outlined"
                            color={action.is_correct ? 'success' : 'error'}
                            onClick={() => handleSubmitAction(action)}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            {action.action_text}
                        </Button>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Emergency101;
