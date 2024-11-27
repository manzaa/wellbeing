import React from 'react';
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    Container,
    Card,
    CardContent,
    Grid,
    CssBaseline,
} from '@mui/material';

const topicsData = [
    {
        title: "What's Spit?",
        description: 'Saliva, or spit, is a liquid in our mouths that helps with digestion and keeps our mouths moist.',
        cause: 'Our salivary glands produce spit throughout the day, especially when we’re eating or thinking about food.',
    },
    {
        title: "What's Sweat?",
        description: 'Sweat is a watery liquid our bodies produce to cool down when we’re hot or exercising.',
        cause: 'Sweat glands in our skin release sweat, especially when it’s hot or when we’re being active.',
    },
    {
        title: 'Why Do I Yawn?',
        description: 'Yawning is a natural reflex that happens when we are tired or bored.',
        cause: 'Yawning may help bring more oxygen into our bodies and cool down our brains.',
    },
    {
        title: "What's a Booger?",
        description: 'A booger is dried-up mucus that gets trapped in our noses.',
        cause: 'Boogers form when dust and dirt are caught in the mucus in our nose.',
    },
    {
        title: "What's a Fart?",
        description: 'A fart is gas that comes out of our digestive system.',
        cause: 'Farts happen when we swallow air or when bacteria in our intestines break down food.',
    },
    {
        title: 'What Causes Hiccups?',
        description: 'Hiccups are sudden, involuntary contractions of the diaphragm muscle.',
        cause: 'They can be caused by eating too fast, excitement, or even temperature changes.',
    },
    {
        title: 'How Do Casts Work?',
        description: 'Casts are hard bandages that keep broken bones in place to heal properly.',
        cause: 'Casts hold bones in place, helping them grow back together and stay protected.',
    },
    {
        title: "What's a Bruise?",
        description: 'A bruise is a mark on the skin caused by blood trapped under the surface.',
        cause: 'Bruises form when tiny blood vessels break due to an injury.',
    },
    {
        title: "What's a Birthmark?",
        description: 'A birthmark is a mark on the skin that’s been there since birth.',
        cause: 'Birthmarks can form due to extra pigment or blood vessels under the skin.',
    },
    {
        title: 'How to Clean Your Hands',
        description: 'Cleaning hands removes dirt, germs, and bacteria to keep us healthy.',
        cause: 'Wash hands with soap and water for at least 20 seconds to kill germs.',
    },
    {
        title: 'Organize, Focus, Get It Done',
        description: 'Being organized helps us focus and complete our tasks effectively.',
        cause: 'Making lists, using a calendar, and setting goals can help us stay organized.',
    },
    {
        title: 'Why Do Feet Stink?',
        description: 'Feet can smell due to sweat and bacteria in our shoes.',
        cause: 'Bacteria break down sweat, creating a smell, especially in warm, damp places.',
    },
    {
        title: "What's a Scab?",
        description: 'A scab is a rough layer that forms over a wound as it heals.',
        cause: 'Scabs form to protect the wound and allow the skin to heal underneath.',
    },
    {
        title: 'First Aid',
        description: 'First aid is the immediate care given to someone who is injured or feeling unwell.',
        cause: 'It involves treating minor injuries and providing comfort before professional help arrives.',
    },
    {
        title: 'Good Touch vs Bad Touch',
        description: 'Understanding safe and unsafe touches helps keep us protected.',
        cause: 'Safe touches make us feel secure, while unsafe touches make us feel uncomfortable.',
    },
];

const Goodtoknow = () => {
    return (
        <>
            <CssBaseline />
            {/* <AppBar position="sticky" sx={{ backgroundColor: '#1e88e5', color: '#fff' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ color: '#ffeb3b' }}>
                        Kids Health & Curiosity Hub
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h4" align="center" color="primary" gutterBottom>
                        Fun Facts & Health Knowledge
                    </Typography>
                    <Grid container spacing={4}>
                        {topicsData.map((topic, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    sx={{
                                        backgroundColor: '#f1f8e9',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 1 }}
                                        >
                                            {topic.title}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: '#6d4c41', lineHeight: 1.6 }}>
                                            <strong>What is it?</strong> {topic.description}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#6d4c41', mt: 1 }}>
                                            <strong>What Causes It?</strong> {topic.cause}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Goodtoknow;
