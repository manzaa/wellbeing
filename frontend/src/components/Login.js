import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Container,
    Typography,
    Paper,
    Grid,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ReactGA from 'react-ga4'; // Import the Google Analytics library

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        // Initialize Google Analytics
        ReactGA.initialize('G-2VY5M0E0RC');  // Replace with your GA4 Measurement ID
        ReactGA.send('pageview'); // Track page view when component is mounted
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/api/auth/login', { email });
            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('subscribed', response.data.subscribed);
            sessionStorage.setItem('userId', response.data.user_id);
            if (token) {
                login(token);
                ReactGA.event({ // Track login event
                    category: 'User',
                    action: 'Login',
                    label: 'User Login Success',
                });
                navigate('/dashboard');
            } else {
                alert('Invalid login credentials');
                ReactGA.event({ // Track login failure event
                    category: 'User',
                    action: 'Login',
                    label: 'User Login Failure',
                });
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            ReactGA.event({ // Track login failure event
                category: 'User',
                action: 'Login',
                label: 'User Login Error',
            });
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            {/* Video Section */}
            <Box mb={4} textAlign="center">
                <Box
                    sx={{
                        maxWidth: '640px',
                        margin: '0 auto',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '10px',
                    }}
                >
                    <video
                        autoPlay
                        muted
                        controls
                        controlsList="nodownload"
                        width="100%"
                        height="360px"
                        style={{
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <source
                            src="/videos/introduction.mp4" // Replace with your video URL
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </Box>
                <Typography
                    variant="body1"
                    sx={{
                        marginTop: '10px',
                        fontSize: '0.7rem',
                        fontWeight: '300',
                        color: '#555',
                    }}
                >
                    Just as an empty glass is filled drop by drop, our minds grow with every bit of well-being
                    knowledge—keep learning and thriving!
                </Typography>
            </Box>

            {/* Main Content Section */}
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Grid container spacing={4}>
                    {/* Login Form Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={handleLogin}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Typography align="right" variant="body2" style={{ marginTop: '5px', marginBottom: '20px' }}>
                                <a href="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                    Forgot Password?
                                </a>
                            </Typography>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                            <Typography align="center" style={{ marginTop: '10px' }}>
                                Don't have an account?{' '}
                                <a href="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                    Sign up for Free
                                </a>
                            </Typography>
                        </form>
                    </Grid>

                    {/* Feature List Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Features of Our Wellbeing Platform
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <SecurityIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Kids & Teens Safety Resources"
                                    secondary="Comprehensive resources on safety and wellbeing, focusing on child and teen protection."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <SelfImprovementIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Wellbeing Topics"
                                    secondary="Covering mental, emotional, and physical health topics, including stress management and resilience building."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <RecordVoiceOverIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Audio Recordings"
                                    secondary="Kids and Teens can record their understandings on various wellbeing topics, helping them build knowledge easily."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <RecordVoiceOverIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Video Insights"
                                    secondary="Kids and Teens can visualize wellbeing concepts or ideas through videos."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ChildCareIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Self-Reliance Activities for Kids"
                                    secondary="Engaging activities like daily routines, cooking challenges, healthy shopping, and 15+ features that foster self-reliance."
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Login;
