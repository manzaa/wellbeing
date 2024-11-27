import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Dialog, DialogTitle, DialogContent, Paper, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import AppleIcon from '@mui/icons-material/Apple';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BookIcon from '@mui/icons-material/Book';
import GratitudeIcon from '@mui/icons-material/EmojiEmotions';
import HandWashIcon from '@mui/icons-material/Soap';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BrushIcon from '@mui/icons-material/Brush';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScreenTimeIcon from '@mui/icons-material/ScreenLockPortrait';
import BreathIcon from '@mui/icons-material/Air';
import FlagIcon from '@mui/icons-material/Flag';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import SportsIcon from '@mui/icons-material/SportsSoccer';

const habits = [
    { 
        title: "Drinking Water",
        icon: <LocalDrinkIcon />,
        description: "Staying hydrated helps with energy levels, concentration, and overall well-being. Aim to drink at least 6-8 glasses of water daily.",
        importance: "Water is essential for life, helping to keep all body functions running smoothly."
    },
    { 
        title: "Eating Fruits and Vegetables",
        icon: <AppleIcon />,
        description: "Eating fruits and vegetables provides essential vitamins and minerals. Make sure to eat a variety of colors to get different nutrients.",
        importance: "Fruits and vegetables help you grow strong and boost your immune system to fight illnesses."
    },
    {
        title: "Exercising Daily",
        icon: <FitnessCenterIcon />,
        description: "Exercise strengthens your muscles and bones, keeps your heart healthy, and boosts your mood.",
        importance: "Exercising keeps you fit and helps you stay focused throughout the day. Aim for at least 30 minutes of fun activity daily."
    },
    {
        title: "Brushing Teeth",
        icon: <BrushIcon />,
        description: "Brushing teeth twice a day helps prevent cavities and keeps your gums healthy.",
        importance: "Good dental hygiene means a healthy smile. Brush for 2 minutes each time to keep germs away."
    },
    {
        title: "Sleeping on Time",
        icon: <BedtimeIcon />,
        description: "Getting 8-9 hours of sleep helps you wake up refreshed, ready to learn and play.",
        importance: "Sleep allows your body to grow and recover. Having a regular sleep schedule keeps your energy high all day."
    },
    {
        title: "Eating Breakfast",
        icon: <BookIcon />,
        description: "Breakfast provides the energy you need to start your day. Choose healthy options like oats, fruits, and yogurt.",
        importance: "A nutritious breakfast kickstarts your day and helps you stay alert and focused in school."
    },
    {
        title: "Practicing Gratitude",
        icon: <GratitudeIcon />,
        description: "Saying thank you and appreciating what you have can make you feel happier and more positive.",
        importance: "Gratitude improves mental health. Try to think of three things you’re grateful for every day."
    },
    {
        title: "Helping Others",
        icon: <FavoriteIcon />,
        description: "Helping others can make you feel good and teaches kindness. Look for ways to assist friends, family, or neighbors.",
        importance: "Helping others makes the world a better place and teaches you empathy and kindness."
    },
    {
        title: "Reading Books",
        icon: <BookIcon />,
        description: "Reading improves knowledge, focus, and imagination. Set a goal to read one new book every week!",
        importance: "Books take you to new worlds and teach valuable lessons. They help build vocabulary and creativity."
    },
    {
        title: "Tidying Up",
        icon: <AssignmentIcon />,
        description: "Keeping your room and study area clean helps you feel organized and ready to learn.",
        importance: "A clean space helps you stay focused. Spend 10 minutes tidying up each day."
    },
    {
        title: "Avoiding Too Much Sugar",
        icon: <AppleIcon />,
        description: "Too much sugar can lead to health issues. Try to limit sugary snacks and drinks.",
        importance: "Excess sugar affects your teeth and energy. Opt for fruits as a sweet treat instead."
    },
    {
        title: "Washing Hands",
        icon: <HandWashIcon />,
        description: "Wash your hands before eating and after playing outside to keep germs away.",
        importance: "Clean hands help prevent illnesses. Use soap and water and wash for at least 20 seconds."
    },
    {
        title: "Limiting Screen Time",
        icon: <ScreenTimeIcon />,
        description: "Too much screen time can strain your eyes. Take breaks and limit your time on devices.",
        importance: "Spending time away from screens helps you sleep better and enjoy other activities."
    },
    {
        title: "Taking Deep Breaths",
        icon: <BreathIcon />,
        description: "Deep breaths can help you calm down and focus when you’re feeling stressed.",
        importance: "Breathing exercises reduce stress and boost your mood. Try 5 deep breaths when feeling overwhelmed."
    },
    {
        title: "Setting Goals",
        icon: <FlagIcon />,
        description: "Setting small goals, like completing your homework on time, helps you stay motivated and organized.",
        importance: "Achieving goals boosts confidence. Break big tasks into smaller steps to reach success."
    },
];

const HealthyReminders = () => {
    const [open, setOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const handleOpenDialog = (habit) => {
        setSelectedHabit(habit);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedHabit(null);
    };

    return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Healthy Habits for Kids
            </Typography>
            <Typography variant="h6" color="textSecondary">
                Click each habit to learn why it’s important and how to maintain it.
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {habits.map((habit, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <Paper 
                                sx={{ padding: 2, cursor: 'pointer', height: '100%' }}
                                onClick={() => handleOpenDialog(habit)}
                                elevation={4}
                            >
                                <Box display="flex" alignItems="center" justifyContent="center" gap={1} sx={{ mb: 1 }}>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                        {habit.icon}
                                    </Avatar>
                                    <Typography variant="h6" color="secondary">
                                        {habit.title}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    {habit.description.slice(0, 50)}...
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleCloseDialog}>
                {selectedHabit && (
                    <>
                        <DialogTitle>{selectedHabit.title}</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                                {selectedHabit.importance}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                {selectedHabit.description}
                            </Typography>
                        </DialogContent>
                        <Button onClick={handleCloseDialog} color="primary" sx={{ margin: 2 }}>
                            Close
                        </Button>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default HealthyReminders;
