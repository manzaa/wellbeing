import React, { useState } from 'react';
import { Container, TextField, Typography, Button, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(process.env.REACT_APP_API_URL + '/api/contact', { email, phone, description })
      .then((response) => {
        setSnackbarMessage('Your message has been sent successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setEmail('');
        setPhone('');
        setDescription('');
      })
      .catch((error) => {
        setSnackbarMessage('Failed to send message. Please try again later.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        console.error('Submission Error:', error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Drop Box</Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email ID"
            fullWidth
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Phone Number"
            fullWidth
            variant="outlined"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;
