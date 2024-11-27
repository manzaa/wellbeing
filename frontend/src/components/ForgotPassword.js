import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Snackbar,
    Alert,
} from '@mui/material';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setSnackbarMessage('Please enter a valid email address.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                process.env.REACT_APP_API_URL + '/api/auth/forgot-password',
                { email }
            );

            setSnackbarMessage(
                response.data.message ||
                    'If the email is registered, a reset link has been sent.'
            );
            setSnackbarSeverity('success');
        } catch (error) {
            console.log(error);
            setSnackbarMessage(
                error.response?.data?.message || 'Failed to process your request.'
            );
            setSnackbarSeverity('error');
        } finally {
            setLoading(false);
            setOpenSnackbar(true);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Forgot Password
                </Typography>
                <Typography variant="body1" align="center" style={{ marginBottom: '20px' }}>
                    Enter your registered email address, and we will send you a link to reset
                    your password.
                </Typography>
                <form onSubmit={handleForgotPassword}>
                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ForgotPassword;
