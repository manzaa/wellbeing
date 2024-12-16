import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

const activities = [
    // ... (Your activities array remains the same)
    
    {
        title: "Sudoku Game",
        description: "Unleash your Game Skills!",
        icon: "/images/sudoku.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a chef character animation URL
        route: "/sudoku"
    },
    {
        title: "Anxiety Relief Games",
        description: "Find Your Calm: Simple, Soothing Games for Anxiety Relief 🌿!",
        icon: "/images/anxiety.webp",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a chef character animation URL
        route: "/anxiety"
    },
    {
        title: "Doodle Journal",
        description: `🎨 **Express Yourself in the Doodle Journal! 🖍️ Draw, write, and let your creativity flow—your thoughts and ideas belong here!** 🌈`,
        icon: "/images/doodle.png",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/doodlejournal"
    }
    ,
    {
        title: "Mindfulness and Gratitude Board Game",
        description: `🎲 **Play, Breathe, and Be Thankful! 🌸 Journey through mindfulness and gratitude with each turn—let’s grow a happy, calm mind together!** 🌈`,
        icon: "/images/gratitude.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/mindfulness"
    },
    {
        title: "printable Worksheets",
        description: `🖍️ **Learn, Color, and Explore! 🖋️ Fun printable worksheets to make learning exciting and hands-on!** 🎉`,
        icon: "/images/print.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/worksheets"
    },
    ,
    {
        title: "Story Book",
        description: `📚 **Dive into Adventure! 🌈 Join Leo the Brave Lion and his friends as they explore, laugh, and learn in the magical jungle!** 🦁🐘🌴`,
        icon: "/images/story.webp",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/storybook"
    },
    {
        title: "Out of The Box Thinking",
        description: `Challenge your Mind and Think Out of The Box`,
        icon: "/images/thinking.webp",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/think-out-of-the-box"
    }
    ,
    {
        title: "Premium Wellbeing Chat Bot",
        description: `💬 **Meet Your Wellbeing Buddy! 🌈 A friendly chatbot here to listen, guide, and help you feel your best every day!** 😊`,
        icon: "/images/bot.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/premium-wellbeing-chatbot"
    },
    {
        title: "Wellbeing Spinner",
        description: `🌈 **Spin to Feel Good! 🎉 Explore fun activities for a happy, healthy mind and body with every spin!** 😊`,
        icon: "/images/spinner.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/wellbeingspinner"
    },
];

const KidPowerHub = () => {
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(localStorage.getItem('subscribed') === '1' ? 1 : null); // Fixed subscription check

    const handleNavigation = (route) => {
        if (isSubscribed) {
            navigate(route);
        }
    };

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            {/* Hero Section with Video */}
            <Box
                sx={{
                    backgroundImage: 'linear-gradient(135deg, #FFB6C1, #FFD700)',
                    color: 'white',
                    py: 8,
                    textAlign: 'center',
                    mb: 6,
                    borderBottom: '4px solid #FFA07A',
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Welcome to Kids and Teens Premium Power Hub!
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4 }}>
                        Explore activities that inspire creativity, learning, and fun!
                    </Typography>
                </Container>
            </Box>

            {/* Interactive Activity Cards */}
            <Container sx={{ py: 6, filter: isSubscribed === 1 ? 'none' : 'blur(5px)' }}>
                <Typography variant="h4" color="primary" textAlign="center" mb={4}>
                    Choose Your Activity
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {activities.map((activity) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={activity.title}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                                <Card
                                    onClick={() => handleNavigation(activity.route)}
                                    sx={{
                                        cursor: 'pointer',
                                        boxShadow: '0px 8px 20px rgba(0,0,0,0.2)',
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        textAlign: 'center',
                                        bgcolor: '#FFA07A',
                                        position: 'relative',
                                        '&:hover': { bgcolor: '#FFD700' },
                                    }}
                                >
                                    {/* Character Animation */}
                                    <Box sx={{ width: '100%', height: '150px', position: 'relative', top: -20 }}>
                                        <Player
                                            autoplay
                                            loop
                                            src={activity.animation}
                                            style={{ height: '120px', margin: 'auto' }}
                                        />
                                    </Box>
                                    <CardContent>
                                        <Avatar
                                            src={activity.icon}
                                            alt={activity.title}
                                            sx={{
                                                width: 70,
                                                height: 70,
                                                mb: 2,
                                                mx: 'auto',
                                                bgcolor: 'white',
                                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                                            }}
                                        />
                                        <Typography variant="h6" color="secondary" gutterBottom>
                                            {activity.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {activity.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Subscription Overlay */}
            {isSubscribed === null && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        zIndex: 10,
                        flexDirection: 'column',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Please subscribe to access this page
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/subscribe')}
                        sx={{ mt: 2 }}
                    >
                        Subscribe Now
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default KidPowerHub;
