import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const wellbeingItems = [
    // Existing categories
    { category: 'Good Practices', name: 'Kindness', isHealthy: true },
    { category: 'Good Practices', name: 'Helping Others', isHealthy: true },
    { category: 'Mental Health', name: 'Positive Thinking', isHealthy: true },
    { category: 'Mental Health', name: 'Deep Breathing', isHealthy: true },
    { category: 'Physical Health', name: 'Exercise', isHealthy: true },
    { category: 'Physical Health', name: 'Junk Food', isHealthy: false },
    { category: 'Respect', name: 'Listening', isHealthy: true },
    { category: 'Respect', name: 'Interrupting', isHealthy: false },
    { category: 'Hydration', name: 'Drinking Water', isHealthy: true },
    { category: 'Hydration', name: 'Sugary Drinks', isHealthy: false },
    { category: 'Gratitude', name: 'Being Thankful', isHealthy: true },
    { category: 'Gratitude', name: 'Ignoring Good Deeds', isHealthy: false },
    { category: 'Screen Time', name: 'Limited Time', isHealthy: true },
    { category: 'Screen Time', name: 'Too Much Screen', isHealthy: false },

    // New categories
    { category: 'Sleep Hygiene', name: 'Regular Bedtime', isHealthy: true },
    { category: 'Sleep Hygiene', name: 'Staying Up Late', isHealthy: false },
    { category: 'Mindfulness', name: 'Meditation', isHealthy: true },
    { category: 'Mindfulness', name: 'Overthinking', isHealthy: false },
    { category: 'Hygiene', name: 'Washing Hands', isHealthy: true },
    { category: 'Hygiene', name: 'Skipping Hand Wash', isHealthy: false },
    { category: 'Learning', name: 'Reading', isHealthy: true },
    { category: 'Learning', name: 'Procrastinating', isHealthy: false },
    { category: 'Friendship', name: 'Supporting Friends', isHealthy: true },
    { category: 'Friendship', name: 'Ignoring Friends', isHealthy: false },
    { category: 'Creativity', name: 'Drawing', isHealthy: true },
    { category: 'Creativity', name: 'Boredom', isHealthy: false },
    { category: 'Outdoor Activities', name: 'Playing Outside', isHealthy: true },
    { category: 'Outdoor Activities', name: 'Staying Indoors All Day', isHealthy: false },
    { category: 'Time Management', name: 'Making a To-Do List', isHealthy: true },
    { category: 'Time Management', name: 'Wasting Time', isHealthy: false },
    { category: 'Personal Safety', name: 'Buckle Seat Belt', isHealthy: true },
    { category: 'Personal Safety', name: 'Not Wearing Helmet', isHealthy: false },
    { category: 'Empathy', name: 'Helping Others', isHealthy: true },
    { category: 'Empathy', name: 'Being Selfish', isHealthy: false }
];

const WellbeingSpinner = () => {
    const [spinning, setSpinning] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const spinWheel = () => {
        setSpinning(true);
        setShowConfetti(false);

        // Select the next item in round-robin fashion
        const nextIndex = (currentIndex + 1) % wellbeingItems.length;
        const item = wellbeingItems[nextIndex];
        setCurrentIndex(nextIndex);

        setTimeout(() => {
            setSelectedItem(item);
            setSpinning(false);
            setShowResult(true);
            if (item.isHealthy) setShowConfetti(true);
        }, 2000);
    };

    const closeResultDialog = () => {
        setShowResult(false);
        setShowConfetti(false);
    };

    // Calculate positions of items in a circular layout
    const radius = 150; // Adjusted radius for a larger wheel
    const angleStep = (2 * Math.PI) / wellbeingItems.length;

    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 5 }}>
            <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>

            {showConfetti && <Confetti recycle={false} />}
            
            <Typography variant="h4" sx={{ mb: 2, color: '#1976d2' }}>
                Wellbeing Spinner
            </Typography>

            {/* Spinner Wheel */}
            <Box
                sx={{
                    width: 350,
                    height: 350,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    border: '12px solid #4caf50',
                    boxShadow: '0px 0px 25px rgba(0,0,0,0.4)',
                    backgroundColor: '#e3f2fd',
                    animation: spinning ? 'spin 2s ease-in-out infinite' : 'none',
                    overflow: 'hidden',
                }}
            >
                {/* Render each item in a circular layout */}
                {wellbeingItems.map((item, index) => {
                    const angle = index * angleStep;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    return (
                        <Box
                            key={index}
                            sx={{
                                position: 'absolute',
                                top: `calc(50% + ${y}px)`,
                                left: `calc(50% + ${x}px)`,
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                color: '#ffffff',
                                backgroundColor: item.isHealthy ? '#43a047' : '#e53935',
                                padding: '6px 10px',
                                borderRadius: '10px',
                                fontSize: '0.9rem',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                minWidth: 60,
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{item.category}</Typography>
                        </Box>
                    );
                })}

                <Typography variant="h5" sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
                    {spinning ? "Spinning..." : selectedItem ? selectedItem.name : "Spin Me"}
                </Typography>
            </Box>

            {/* Spin Button */}
            <Button
                variant="contained"
                color="primary"
                endIcon={<RotateRightIcon />}
                onClick={spinWheel}
                sx={{ mt: 3, fontWeight: 'bold' }}
                disabled={spinning}
            >
                {spinning ? "Spinning..." : "Spin the Wheel"}
            </Button>

            {/* Result Dialog */}
            <Dialog open={showResult} onClose={closeResultDialog}>
                <DialogContent>
                    <Typography variant="h6">
                        {selectedItem ? `You got: ${selectedItem.name} (${selectedItem.category})` : ""}
                    </Typography>
                    <Typography variant="body1">
                        {selectedItem?.isHealthy ? "This is a healthy choice! 🎉" : "This is not a healthy choice. Try again!"}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeResultDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Spinner Keyframes */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </Box>
    );
};

export default WellbeingSpinner;
