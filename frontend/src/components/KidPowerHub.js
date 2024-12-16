import { React, useContext, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button, Container, Snackbar, Alert,
    Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
const activities = [
    {
        title: "Parent Respect Game",
        description: `💖 **Celebrate and Respect! 👪 Discover fun ways to show kindness, appreciation, and respect for your parents every day!** 🌟`,
        icon: "/images/respect.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/parentrespectgame"
    },
    {
        title: "Chef for the Day",
        description: "Take on a fun cooking challenge and learn kitchen skills!",
        icon: "/images/chef.webp",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a chef character animation URL
        route: "/cooking-challenge"
    },
    {
        title: "Build Your Lunch Box",
        description: `🍎 **Create a Power-Packed Lunch! 🥪 Pick healthy foods and build a lunchbox that fuels your body and mind!** 💪🌞`,
        icon: "/images/lunchbox.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a chef character animation URL
        route: "/buildlunchbox"
    // },
    // {
    //     title: "Savings Jar Game",
    //     description: `💰 **Grow Your Savings Superpower! 🌟 Add coins, watch your jar fill up, and learn smart ways to save!** 🐷`,
    //     icon: "/images/piggy.jpg",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a chef character animation URL
    //     route: "/savingsjargame"
    },
    // {
    //     title: "Room Rescue",
    //     description: "Turn cleaning into a fun mission!",
    //     icon: "/images/room-rescue.png",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_2KhuL4.json", // Replace with a cleaning character animation URL
    //     route: "/roomrescue"
    // },
    {
        title: "Budget Buddy",
        description: "Learn to budget while shopping for essentials.",
        icon: "/images/budget.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a shopping character animation URL
        route: "/budgetbuddy"
    },
    {
        title: "Plan-a-Day",
        description: "Create a schedule for a productive day!",
        icon: "/images/plan.png",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a planning character animation URL
        route: "/planAday"
    },
    
    {
        title: "Wellbeing Game",
        description: "Unleash your Game Skills!",
        icon: "/images/sudoku.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a chef character animation URL
        route: "/wellbeing"
    }
    ,
    {
        title: "Stress Relief Games",
        description: "Find Your Calm: Simple, Soothing Games for Stress Relief 🌿!",
        icon: "/images/anxiety.webp",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a chef character animation URL
        route: "/stress"
    }
    // {
    //     title: "My Feelings Friend",
    //     description: "Check-in on your emotions and reflect on your day.",
    //     icon: "/images/feelings-friend.png",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_CzD9zq.json", // Replace with a mood character animation URL
    //     route: "/myfeelingsfriend"
    // },
    // {
    //     title: "Eco Explorer",
    //     description: "Discover nature and become a detective outdoors!",
    //     icon: "/images/eco-explorer.png",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_9frto6qq.json", // Replace with an explorer character animation URL
    //     route: "/ecoexplorer"
    // },
    // {
    //     title: "Emergency 101",
    //     description: "Learn how to handle safety situations with confidence.",
    //     icon: "/images/emergency-101.png",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_XShhKQ.json", // Replace with an emergency character animation URL
    //     route: "/emergency101"
    // }
    
    // {
    //     title: "Weather Watcher",
    //     description: "Express yourself with drawings, notes, or recordings!",
    //     icon: "/images/doodle-journal.png",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_t0mwbn0j.json", // Replace with a doodling character animation URL
    //     route: "/weatherwatcher"
    // },
    ,
    {
        title: "Home Helper",
        description: `🏠 **Become a Home Helper Hero! 🌟 Learn fun ways to lend a hand, keep things tidy, and make home a happier place!** 😊`,
        icon: "/images/homehelper.png",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/homehelper"
    },
    {
        title: "Virtual Lab",
        description: `🔬 **Step into the Virtual Lab! 🌐 Explore, experiment, and uncover science wonders right from your screen!** 🌟`,
        icon: "/images/lab.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/virtuallab"
    },
    // {
    //     title: "Adventure Map",
    //     description: "Express yourself with drawings, notes, or recordings!",
    //     icon: "/images/doodle-journal.png",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_t0mwbn0j.json", // Replace with a doodling character animation URL
    //     route: "/adventuremap"
    // },
    
    
    {
        title: "Wellbeing Chat Bot",
        description: `💬 **Meet Your Wellbeing Buddy! 🌈 A friendly chatbot here to listen, guide, and help you feel your best every day!** 😊`,
        icon: "/images/bot.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/wellbeingchatbot"
    },
    // {
    //     title: "World Map Spotting",
    //     description: "Express yourself with drawings, notes, or recordings!",
    //     icon: "/images/doodle-journal.png",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_t0mwbn0j.json", // Replace with a doodling character animation URL
    //     route: "/worldmapspotting"
    // },
    
    // {
    //     title: "Phonics Worksheets",
    //     description: "Express yourself with drawings, notes, or recordings!",
    //     icon: "/images/doodle-journal.png",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_t0mwbn0j.json", // Replace with a doodling character animation URL
    //     route: "/phonics"
    // },
    {
        title: "Good Vs Bad",
        description: `👍👎 **Spot the Good, Skip the Bad! 🥦🍭 Learn to choose what helps you grow strong and stay happy!** 🌟`,
        icon: "/images/goodvsbad.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/goodvsbad"
    },
    {
        title: "Daily Routine",
        description: `⏰ **Build Your Super Day with Daily Routines! 🦸‍♂️ From morning to bedtime, let’s make every day strong, fun, and organized!** 🌞`,
        icon: "/images/routine.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/routine"
    },
    {
        title: "Healthy Reminders",
        description: `🧡 **Stay Strong and Happy with Healthy Habits! 🍎 Remember to move, eat well, and rest—small steps for a big, healthy YOU!** 🌟`,
        icon: "/images/reminder.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/reminders"
    },
    {
        title: "Nature Health",
        description: `🌍 Explore, Protect, and Grow with Nature! 🌿 Discover how plants, animals, and clean air help us stay healthy—and how you can be a hero for the Earth! 🌞`,
        icon: "/images/nature.jpg",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/naturehealth"
    }
    // ,
    // {
    //     title: "Moral Stories",
    //     description: "Express yourself with drawings, notes, or recordings!",
    //     icon: "/images/doodle-journal.png",
    //     //animation: "https://assets3.lottiefiles.com/packages/lf20_t0mwbn0j.json", // Replace with a doodling character animation URL
    //     route: "/moralstories"
    // }
    ,
    {
        title: "Good To Know",
        description: `Know why and what causes it`,
        icon: "/images/sunset.webp",
        animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
        route: "/goodtoknow"
    }
    
    // ,
    // {
    //     title: "Magic Wellbeing",
    //     description: `💬 **Magic** 😊`,
    //     icon: "/images/magic.jpg",
    //     animation: "https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json", // Replace with a doodling character animation URL
    //     route: "/magics"
    // }
];

const KidPowerHub = () => {
    const navigate = useNavigate();
    const isSubscribed = localStorage.getItem('subscribed');
    console.log("issubscribed", isSubscribed);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const handleNavigation = (route) => {
        navigate(route);
    };

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleKnowledgeBaseClick = () => {
        if (isSubscribed === 1) {
            navigate("/kids-knowledge-base");
        } else {
            setDialogOpen(true); // Open dialog for non-subscribers
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false); // Close dialog
      };
    
      const handleSubscribeNow = () => {
        navigate("/subscribe"); // Navigate to subscription page
        handleCloseDialog();
      };
    
    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    return (
        <Box>
            {/* Hero Section with Video */}
            <Box
                sx={{
                    backgroundImage: 'linear-gradient(135deg, #FFB6C1, #FFD700)',
                    color: 'white',
                    py: 8,
                    textAlign: 'center',
                    mb: 6,
                    borderBottom: '4px solid #FFA07A'
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Welcome to KidPower Hub!
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4 }}>
                        Explore activities that inspire creativity, learning, and fun!
                    </Typography>

                    {/* Embedded Video */}
                    {/* <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/example_video_id" // Replace with the correct video link
                            title="Health and Wellbeing Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ borderRadius: 10, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' }}
                        ></iframe>
                    </Box> */}
                </Container>
            </Box>

{/* Kids Knowledge Base Section */}
{/* <Container sx={{ py: 4 }}>
                <Typography
                    variant="h4"
                    color="primary"
                    textAlign="center"
                    sx={{ mb: 4, textDecoration: 'underline' }}
                >
                    Kids & Teens Knowledge Base
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    textAlign="center"
                    sx={{ mb: 3 }}
                >
                    Discover amazing facts, learn about the world, and boost your knowledge with our special knowledge base just for kids!
                </Typography>
                <Box textAlign="center">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={navigateToKnowledgeBase}
                        sx={{
                            bgcolor: '#FFA07A',
                            '&:hover': { bgcolor: '#FFD700' },
                            fontWeight: 'bold'
                        }}
                    >
                        Explore Knowledge Base
                    </Button>
                </Box>
            </Container> */}

<Container sx={{ py: 4 }}>
            <Typography
                variant="h4"
                color="primary"
                textAlign="center"
                sx={{ mb: 4, textDecoration: "underline" }}
            >
                Kids & Teens Knowledge Base
            </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
                textAlign="center"
                sx={{ mb: 3 }}
            >
                Discover amazing facts, learn about the world, and boost your knowledge with our
                special knowledge base just for kids!
            </Typography>
            <Box textAlign="center">
               <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleKnowledgeBaseClick} // Call function here
                sx={{
                    bgcolor: "#FFA07A",
                    "&:hover": { bgcolor: "#FFD700" },
                    fontWeight: "bold",
                }}
                >
                    Explore Knowledge Base
                </Button>
            </Box>

            {/* Dialog for Non-Subscribers */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
                Join 1,000+ Happy Parents!
                </DialogTitle>
                <DialogContent>
                <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
                    Access premium features and unlock amazing learning experiences for
                    your kids! Subscribe now to enjoy exclusive content and resources
                    designed to boost their well-being.
                </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                    variant="outlined"
                    onClick={handleCloseDialog}
                    sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    bgcolor: "#f5f5f5",
                    "&:hover": { bgcolor: "#e0e0e0" },
                    }}
                >
                    Not Now
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubscribeNow}
                    sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    ml: 2,
                    }}
                >
                    Subscribe Now
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    
            {/* Interactive Activity Cards */}
            <Container sx={{ py: 6 }}>
                <Typography variant="h4" color="primary" textAlign="center" mb={4}>
                    Choose Your Activity
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {activities.map((activity) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={activity.title}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
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
                                        "&:hover": { bgcolor: '#FFD700' }
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
                                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
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
        </Box>
    );
};

export default KidPowerHub;
