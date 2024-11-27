import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const storySteps = [
    {
        text: "Once upon a time, a crow was very thirsty and searched for water everywhere.",
    },
    {
        text: "Finally, the crow found a pitcher with a little water at the bottom, but it was too low to reach.",
    },
    {
        text: "The crow thought of a plan and began dropping pebbles into the pitcher.",
    },
    {
        text: "With each pebble, the water level rose little by little.",
    },
    {
        text: "After many pebbles, the water level was high enough for the crow to drink. The crow happily quenched its thirst!",
    },
];

const CrowAndPitcher = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [pebbles, setPebbles] = useState(0);

    const handleNextStep = () => {
        if (currentStep < storySteps.length - 1) {
            setCurrentStep(currentStep + 1);
            if (currentStep >= 2 && currentStep < storySteps.length - 2) {
                setPebbles((prevPebbles) => prevPebbles + 1);
            }
        }
    };

    return (
        <Box sx={{ textAlign: 'center', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                The Crow and the Pitcher
            </Typography>
            <Paper elevation={6} sx={{ padding: 3, marginBottom: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    {storySteps[currentStep].text}
                </Typography>
                
                <Box sx={{ position: 'relative', width: 200, height: 400, margin: 'auto' }}>
                    {/* Pitcher */}
                    <svg width="100%" height="100%" viewBox="0 0 200 400">
                        <rect x="60" y="100" width="80" height="280" fill="#c4a484" rx="40" ry="40" />
                        
                        {/* Water level */}
                        <motion.rect
                            x="60"
                            y={380 - pebbles * 20}
                            width="80"
                            height={pebbles * 20}
                            fill="#4a90e2"
                            initial={{ height: 0 }}
                            animate={{ height: pebbles * 20 }}
                            transition={{ duration: 0.5 }}
                        />
                    </svg>

                    {/* Crow */}
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: pebbles > 0 ? -10 : 0 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', textAlign: 'center' }}
                    >
                        <img src="/images/crow.svg" alt="crow" width="100" />
                    </motion.div>

                    {/* Pebbles */}
                    <AnimatePresence>
                        {[...Array(pebbles)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 340 - i * 20, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    bottom: 100,
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="10" fill="#8b4513" />
                                </svg>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Box>
                
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextStep}
                    sx={{ mt: 3 }}
                    disabled={currentStep === storySteps.length - 1}
                >
                    Next
                </Button>
                
                {currentStep === storySteps.length - 1 && (
                    <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
                        Moral: Where there's a will, there's a way.
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default CrowAndPitcher;
