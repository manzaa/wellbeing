import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Card, CardContent, Tooltip, Grid, Avatar,
    Snackbar, Alert, Button, Badge, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import OpacityIcon from '@mui/icons-material/Opacity';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WavesIcon from '@mui/icons-material/Waves';
import AirIcon from '@mui/icons-material/Air';
import ForestIcon from '@mui/icons-material/Forest';
import TerrainIcon from '@mui/icons-material/Terrain';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import BugReportIcon from '@mui/icons-material/BugReport';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

const topicsData = [
    { id: 1, title: "Save Soil", description: "Healthy soil grows our food.", causes: "Excessive use of chemicals and deforestation harm the soil.", protection: "Use natural fertilizers and plant more trees.", icon: <LocalFloristIcon fontSize="large" /> },
    { id: 2, title: "Save Water", description: "Water is precious, use it wisely.", causes: "Wastage and pollution from factories harm water supplies.", protection: "Avoid wasting water and reduce pollution.", icon: <OpacityIcon fontSize="large" /> },
    { id: 3, title: "Save Trees", description: "Trees provide oxygen and shelter.", causes: "Deforestation and urbanization reduce tree cover.", protection: "Plant more trees and use wood products wisely.", icon: <ForestIcon fontSize="large" /> },
    { id: 4, title: "Water Pollution", description: "Pollution harms rivers and oceans.", causes: "Dumping waste in water bodies and oil spills.", protection: "Avoid disposing waste in water and reduce plastic use.", icon: <WavesIcon fontSize="large" /> },
    { id: 5, title: "Air Pollution", description: "Air pollution is harmful to all.", causes: "Vehicle emissions and industrial fumes.", protection: "Use public transport, walk more, and limit factory emissions.", icon: <AirIcon fontSize="large" /> },
    { id: 6, title: "Reduce Plastic", description: "Plastic harms wildlife and takes years to decay.", causes: "Plastic waste accumulation in landfills and oceans.", protection: "Reduce plastic use, recycle, and use eco-friendly materials.", icon: <AirIcon fontSize="large" /> },
    { id: 7, title: "Protect Wildlife", description: "Animals need our protection.", causes: "Habitat destruction and poaching.", protection: "Support wildlife conservation and protect habitats.", icon: <EmojiNatureIcon fontSize="large" /> },
    { id: 8, title: "Conserve Energy", description: "Turn off lights to save power.", causes: "Using non-renewable sources for energy.", protection: "Use renewable sources like solar energy and save power.", icon: <ElectricBoltIcon fontSize="large" /> },
    { id: 9, title: "Reduce Carbon Footprint", description: "Walk or bike to reduce pollution.", causes: "Burning fossil fuels for transportation and factories.", protection: "Use bikes, walk, and reduce energy consumption.", icon: <TerrainIcon fontSize="large" /> },
    { id: 10, title: "Avoid Littering", description: "Keep nature clean and green.", causes: "Littering in public places and improper waste disposal.", protection: "Dispose of waste responsibly and keep areas clean.", icon: <BugReportIcon fontSize="large" /> }
];

const NatureHealthGame = () => {
    const userId = sessionStorage.getItem('userId');
    const badgeKey = `natureHealthBadge_${userId}`;
    const completedTopicsKey = `completedTopics_${userId}`;
    const starsKey = `stars_${userId}`;

    const [completedTopics, setCompletedTopics] = useState([]);
    const [stars, setStars] = useState(0);
    const [badgeEarned, setBadgeEarned] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [introDialogOpen, setIntroDialogOpen] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCompleted = JSON.parse(sessionStorage.getItem(completedTopicsKey)) || [];
        const storedBadge = sessionStorage.getItem(badgeKey) === "true";
        const storedStars = parseInt(sessionStorage.getItem(starsKey), 10) || 0;
        setCompletedTopics(storedCompleted);
        setBadgeEarned(storedBadge);
        setStars(storedStars);
    }, [userId, completedTopicsKey, badgeKey, starsKey]);

    useEffect(() => {
        sessionStorage.setItem(completedTopicsKey, JSON.stringify(completedTopics));
        sessionStorage.setItem(starsKey, stars.toString());
        if (completedTopics.length === topicsData.length) {
            setBadgeEarned(true);
            sessionStorage.setItem(badgeKey, "true");
            setSnackbarOpen(true);
        }
    }, [completedTopics, stars, completedTopicsKey, starsKey, badgeKey]);

    const handleCompleteTopic = (topic) => {
        if (!completedTopics.includes(topic.id)) {
            setCompletedTopics((prev) => [...prev, topic.id]);
            setStars((prevStars) => prevStars + 1);
            setSelectedTopic(topic);
        }
    };

    const resetProgress = () => {
        setCompletedTopics([]);
        setBadgeEarned(false);
        setStars(0);
        sessionStorage.removeItem(completedTopicsKey);
        sessionStorage.removeItem(badgeKey);
        sessionStorage.removeItem(starsKey);
    };

    return (
        <Box sx={{ textAlign: 'center', p: 4, backgroundColor: '#e0f7fa' }}>
            <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>
            <Dialog open={introDialogOpen} onClose={() => setIntroDialogOpen(false)}>
                <DialogTitle>Why Nature Health Matters 🌎</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Nature provides us with fresh air, clean water, and food. Protecting the environment keeps us and animals healthy.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Pollution, deforestation, and waste harm our planet, but by taking small steps, we can make a big difference.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIntroDialogOpen(false)} color="primary">Start Adventure</Button>
                </DialogActions>
            </Dialog>

            <Typography variant="h3" color="primary" gutterBottom>
                Nature Health Adventure 🌍
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
                Go on a mission to protect the Earth and earn stars!
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {topicsData.map((topic) => (
                    <Grid item xs={12} sm={6} md={4} key={topic.id}>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleCompleteTopic(topic)}
                        >
                            <Card
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    cursor: 'pointer',
                                    backgroundColor: completedTopics.includes(topic.id) ? '#c8e6c9' : '#ffffff',
                                    boxShadow: completedTopics.includes(topic.id) ? '0 0 15px 0 rgba(76,175,80,0.5)' : '0 0 5px 0 rgba(0,0,0,0.2)',
                                    "&:hover": { boxShadow: "0 0 20px rgba(76, 175, 80, 0.7)" },
                                }}
                            >
                                <Tooltip title={topic.description}>
                                    <Badge color="primary" badgeContent={completedTopics.includes(topic.id) ? <CheckCircleOutlineIcon /> : <StarIcon />}>
                                        <Avatar sx={{ bgcolor: '#81c784', mr: 2 }}>{topic.icon}</Avatar>
                                    </Badge>
                                </Tooltip>
                                <CardContent>
                                    <Typography variant="h6">{topic.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {completedTopics.includes(topic.id) ? "Mission Complete!" : "Click to start mission"}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {badgeEarned && (
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h5" color="success.main" gutterBottom>
                        You've earned the Nature Hero Badge!
                    </Typography>
                    <Avatar sx={{ mx: 'auto', bgcolor: '#4caf50' }}>
                        <AirIcon fontSize="large" />
                    </Avatar>
                </Box>
            )}

            <Button onClick={resetProgress} color="secondary" variant="contained" sx={{ mt: 4 }}>
                Restart Adventure
            </Button>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Congratulations! You completed all nature missions!
                </Alert>
            </Snackbar>

            {selectedTopic && (
                <Dialog open={Boolean(selectedTopic)} onClose={() => setSelectedTopic(null)}>
                    <DialogTitle>{selectedTopic.title}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" sx={{ mb: 1 }}>🚨 Causes: {selectedTopic.causes}</Typography>
                        <Typography variant="body1">💡 Protection: {selectedTopic.protection}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSelectedTopic(null)} color="primary">
                            Got it!
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default NatureHealthGame;
