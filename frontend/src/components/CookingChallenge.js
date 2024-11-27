import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, Card, CardContent, Snackbar, Alert, Select, MenuItem } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const CookingChallenge = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [mealType, setMealType] = useState('Breakfast');
    const [challenge, setChallenge] = useState(null);
    const navigate = useNavigate();

    // Fetch a random cooking challenge based on the selected meal type
    const fetchChallenge = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cooking/random`, { params: { mealType } });
            const { challenge } = response.data;
            console.log("challenge", challenge, challenge['steps'], challenge.steps);
            setChallenge(challenge[0]);
            setSelectedIngredients([]);
            setActiveStep(0);
        } catch (error) {
            console.error("Error fetching challenge", error);
        }
    };

    useEffect(() => {
        fetchChallenge();
    }, [mealType]);

    const handleIngredientSelect = (ingredient) => {
        setSelectedIngredients((prev) =>
            prev.includes(ingredient) ? prev.filter(item => item !== ingredient) : [...prev, ingredient]
        );
    };

    const handleNext = () => {
        if (activeStep === challenge.steps.length - 1) {
            setIsCompleted(true);
            setSnackbarOpen(true);
            const postBadge = async () => {
                try {
                    await axios.post(process.env.REACT_APP_API_URL + '/api/badges', {
                        userId: sessionStorage.getItem('userId'),
                        badgeName: `${mealType} Cooking Badge`
                    });
                } catch (error) {
                    console.error("Error adding badge", error);
                }
            };
            postBadge();
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    return (
        <Box sx={{ p: 4, maxWidth: 700, mx: 'auto', background: '#E3F2FD', borderRadius: 3 }}>
            <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>

            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
                Cooking Challenge - {mealType}
            </Typography>
            <Select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                sx={{ mb: 2 }}
            >
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
            </Select>
            {challenge && (
                <>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {challenge['steps'].map((step, index) => (
                            <Step key={index}>
                                <StepLabel>{step.title}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Card sx={{ mt: 4, p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                {challenge['steps'][activeStep].title}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {challenge['steps'][activeStep].description}
                            </Typography>
                            {activeStep === 0 && (
                                <Box>
                                    <Typography variant="subtitle1">Select Ingredients:</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                        {challenge['ingredients'].map((ingredient) => (
                                            <Button
                                                key={ingredient}
                                                variant={selectedIngredients.includes(ingredient) ? 'contained' : 'outlined'}
                                                onClick={() => handleIngredientSelect(ingredient)}
                                            >
                                                {ingredient}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                            {activeStep === challenge.steps.length - 1 && (
                                <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                                    <CheckCircleOutlineIcon /> Congratulations! You’ve completed the challenge and earned a "{mealType} Cooking Badge"!
                                </Typography>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    disabled={activeStep === 0 && selectedIngredients.length === 0}
                                >
                                    {activeStep === challenge.steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </>
            )}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    Challenge Completed! You’ve earned a {mealType} Cooking Badge.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CookingChallenge;
