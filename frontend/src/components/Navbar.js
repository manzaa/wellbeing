import React from 'react';
import { AppBar, Toolbar, IconButton, Tooltip } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShieldIcon from '@mui/icons-material/Shield';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.webp'; // Tell webpack this JS file uses this image
import { useAuth } from '../AuthContext';
import { AddIcCall } from '@mui/icons-material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import QuizIcon from '@mui/icons-material/Quiz';

const Navbar = () => {
    const navigate = useNavigate();
    //const { isAuthenticated, logout } = useAuth();
    //console.log("useAuth", useAuth());

    //if (!isAuthenticated) return <p>You are not logged in.</p>;

    const handleLogout = () => {
        // Clear user session (e.g., remove token) and navigate to Room Rescue challenge not founlogin page
        localStorage.removeItem('token'); // Example if using localStorage
        navigate('/'); // Redirect to login page
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <Tooltip title="Wellbeing Topics/Subtopics. Kids can like the topic and record their understanding in audio." arrow>
                    <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
                        <FitnessCenterIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Kid's & Teen's Safety Resources" arrow>
                    <IconButton color="inherit" onClick={() => navigate('/safetyresources')}>
                        <ShieldIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Challenges & Activities" arrow>
                    <IconButton color="inherit" onClick={() => navigate('/kidpowerhub')}>
                        <SportsKabaddiIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Contact Us" arrow>
                    <IconButton color="inherit" onClick={() => navigate('/contact')}>
                        <AddIcCall />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Premium Wellbeing Activities" arrow>
                    <IconButton color="inherit" onClick={() => navigate('/premium')}>
                        <HealthAndSafetyIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Video Insights for Wellbeing" arrow>
                    <IconButton color="inherit" onClick={() => navigate('/insights')}>
                        <OndemandVideoIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Wellbeing Quiz" arrow>
                    <IconButton color="inherit" onClick={() => navigate('/wellbeingquiz')}>
                        <QuizIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Logout" arrow>
                    <IconButton color="inherit" onClick={() => handleLogout()} sx={{ marginLeft: 'auto' }}>
                        <LogoutIcon />
                    </IconButton>
                </Tooltip>

                {/* <Tooltip title="Logout" arrow>
                    <IconButton color="inherit" onClick={() => navigate('/logout')} sx={{ marginLeft: 'auto' }}>
                        <LogoutIcon />
                    </IconButton>
                </Tooltip> */}
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
