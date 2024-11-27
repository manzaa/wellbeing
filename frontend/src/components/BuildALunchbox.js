import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

const foodItems = [
    { name: 'Apple', group: 'fruits', nutrition: { vitamins: 5 }, color: '#FFA07A', type: 'healthy' },
    { name: 'Broccoli', group: 'vegetables', nutrition: { vitamins: 4, fiber: 3 }, color: '#98FB98', type: 'healthy' },
    { name: 'Candy', group: 'sweets', nutrition: { sugar: 8 }, color: '#FFC0CB', type: 'unhealthy' },
    { name: 'Chicken', group: 'proteins', nutrition: { protein: 6 }, color: '#FFD700', type: 'healthy' },
    { name: 'Pizza', group: 'junk', nutrition: { fat: 10, carbs: 5 }, color: '#FF4500', type: 'unhealthy' },
    { name: 'Yogurt', group: 'dairy', nutrition: { calcium: 3, protein: 2 }, color: '#E0FFFF', type: 'healthy' },
    { name: 'Soda', group: 'drinks', nutrition: { sugar: 10 }, color: '#FF6347', type: 'unhealthy' },
    { name: 'Orange', group: 'fruits', nutrition: { vitamins: 3, fiber: 2 }, color: '#FFA500', type: 'healthy' },
    { name: 'Ice Cream', group: 'desserts', nutrition: { sugar: 6, fat: 4 }, color: '#FFDAB9', type: 'unhealthy' },
    { name: 'Rice', group: 'grains', nutrition: { carbs: 5 }, color: '#F5DEB3', type: 'healthy' }
];

const dailyNutritionGoal = {
    vitamins: 8,
    protein: 8,
    carbs: 6,
    calcium: 5,
    fiber: 3
};

const BuildALunchbox = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [pushedItems, setPushedItems] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const userId = sessionStorage.getItem('userId');
    const platterControls = useAnimation();

    // Start platter rotation animation with slower speed
    useEffect(() => {
        platterControls.start({
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 20, // Slower rotation speed
                ease: "linear"
            }
        });
    }, [platterControls]);

    useEffect(() => {
        const today = new Date().toDateString();
        const storageKey = `lunchboxGameData_${userId}`;
        const storedData = JSON.parse(sessionStorage.getItem(storageKey));

        if (!storedData || storedData.date !== today) {
            sessionStorage.setItem(storageKey, JSON.stringify({ date: today, items: [], badge: null }));
            setSelectedItems([]);
        } else {
            setSelectedItems(storedData.items);
        }
    }, [userId]);

    const updateSessionData = (newItems) => {
        const today = new Date().toDateString();
        const storageKey = `lunchboxGameData_${userId}`;
        sessionStorage.setItem(storageKey, JSON.stringify({ date: today, items: newItems }));
    };

    const handleSelectItem = (item) => {
        if (!selectedItems.some(selected => selected.name === item.name)) {
            const updatedItems = [...selectedItems, item];
            setSelectedItems(updatedItems);
            updateSessionData(updatedItems);
        }
    };

    const handlePushToLunchbox = () => {
        if (selectedItems.length > 0) {
            setPushedItems(prev => [...prev, selectedItems[0]]);
            setSelectedItems(selectedItems.slice(1));
        }
    };

    const handleSubmitLunchbox = () => {
        let nutritionSummary = { vitamins: 0, protein: 0, carbs: 0, calcium: 0, fiber: 0 };

        pushedItems.forEach(item => {
            for (let nutrient in item.nutrition) {
                nutritionSummary[nutrient] += item.nutrition[nutrient];
            }
        });

        if (
            nutritionSummary.vitamins >= dailyNutritionGoal.vitamins &&
            nutritionSummary.protein >= dailyNutritionGoal.protein &&
            nutritionSummary.carbs >= dailyNutritionGoal.carbs &&
            nutritionSummary.calcium >= dailyNutritionGoal.calcium &&
            nutritionSummary.fiber >= dailyNutritionGoal.fiber
        ) {
            setFeedback("Great job! You've built a balanced lunchbox!");
            sessionStorage.setItem(`badge_${userId}`, JSON.stringify({ name: 'Balanced Meal Badge', date: new Date().toDateString() }));
        } else {
            setFeedback("Almost there! Try adding more from different food groups.");
        }
        setDialogOpen(true);
    };

    return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h3" color="primary" gutterBottom>
                Build-a-Lunchbox
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={3}>
                Select items from the rotating platter and push them into your lunchbox!.
                <b> This will tell you what is a blanced lunchbox.</b>
            </Typography>

            {/* Rotating Platter */}
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <motion.div
                    animate={platterControls}
                    style={{
                        position: 'relative',
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        backgroundColor: '#FFDAB9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}
                >
                    {foodItems.map((item, index) => (
                        <Box
                            key={index}
                            onClick={() => handleSelectItem(item)}
                            sx={{
                                position: 'absolute',
                                top: `${50 + 40 * Math.sin((index / foodItems.length) * 2 * Math.PI)}%`,
                                left: `${50 + 40 * Math.cos((index / foodItems.length) * 2 * Math.PI)}%`,
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: item.color,
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <Typography variant="body2" color="white">{item.name}</Typography>
                        </Box>
                    ))}
                </motion.div>
            </Box>

            {/* Selected Items */}
            <Typography variant="h6" gutterBottom>Selected Items</Typography>
            <Grid container spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                {selectedItems.map((item, index) => (
                    <Grid item key={index}>
                        <Box sx={{ backgroundColor: item.color, borderRadius: '8px', padding: '8px' }}>
                            <Typography variant="body2" color="white">{item.name}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Push Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handlePushToLunchbox}
                disabled={selectedItems.length === 0}
            >
                Push to Lunchbox
            </Button>

            {/* Lunchbox Items */}
            <Typography variant="h6" color="primary" sx={{ mt: 4 }}>Lunchbox</Typography>
            <Grid container spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                {pushedItems.map((item, index) => (
                    <Grid item key={index}>
                        <Box sx={{ backgroundColor: item.color, borderRadius: '8px', padding: '8px' }}>
                            <Typography variant="body2" color="white">{item.name}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Submit Button */}
            <Button
                variant="contained"
                color="success"
                onClick={handleSubmitLunchbox}
                sx={{ mt: 3 }}
            >
                Submit Lunchbox
            </Button>

            {/* Feedback Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Feedback</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{feedback}</Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default BuildALunchbox;
