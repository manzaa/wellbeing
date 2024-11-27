import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const ResetPassword = () => {
    const { token } = useParams(); // Extract token from the URL
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setSnackbarMessage('Passwords do not match.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        try {
            setLoading(true);

            // Send the token and new password to the backend
            const response = await axios.post(
                process.env.REACT_APP_API_URL + '/api/auth/reset-password',
                { token, password: newPassword }
            );

            setSnackbarMessage(response.data.message || 'Password reset successful.');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            setSnackbarMessage(
                error.response?.data?.message || 'Failed to reset password.'
            );
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Reset Password
                </Typography>
                <Typography variant="body1" align="center" style={{ marginBottom: '20px' }}>
                    Please enter your new password.
                </Typography>
                <form onSubmit={handleResetPassword}>
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        style={{ marginTop: '20px' }}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
