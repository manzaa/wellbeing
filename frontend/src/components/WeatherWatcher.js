import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Container, Grid, Button } from '@mui/material';
import axios from 'axios';

const WeatherWatcher = () => {
    const [weather, setWeather] = useState(null);
    const [outfits, setOutfits] = useState([]);
    const [selectedOutfit, setSelectedOutfit] = useState(null);

    useEffect(() => {
        fetchWeather();
        fetchOutfits();
    }, []);

    const fetchWeather = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/api/weather/today');
            setWeather(response.data.weather);
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    const fetchOutfits = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/api/outfits');
            setOutfits(response.data.outfits);
        } catch (error) {
            console.error('Error fetching outfits:', error);
        }
    };

    const selectOutfit = async (outfitId) => {
        try {
            await axios.post(process.env.REACT_APP_API_URL + '/api/outfits/select', {
                userId: 1,
                weatherId: weather.id,
                outfitId
            });
            setSelectedOutfit(outfitId);
            console.log('Outfit selected!');
        } catch (error) {
            console.error('Error selecting outfit:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" color="primary" textAlign="center" sx={{ mb: 4 }}>
                Weather Watcher - Daily Outfit Planner
            </Typography>

            {weather && (
                <Box textAlign="center" sx={{ mb: 4 }}>
                    <Typography variant="h5">Today's Weather: {weather.conditions}</Typography>
                </Box>
            )}

            <Grid container spacing={2} justifyContent="center">
                {outfits.map((outfit) => (
                    <Grid item xs={12} sm={6} md={4} key={outfit.id}>
                        <Box
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                border: selectedOutfit === outfit.id ? '2px solid green' : '1px solid #ccc',
                                borderRadius: 2
                            }}
                            onClick={() => selectOutfit(outfit.id)}
                        >
                            <Avatar src={outfit.image_url} alt={outfit.name} sx={{ width: 100, height: 100, mx: 'auto' }} />
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                {outfit.name}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {selectedOutfit && (
                <Box textAlign="center" sx={{ mt: 4 }}>
                    <Button variant="contained" color="success" onClick={() => alert('Outfit selected successfully!')}>
                        View Badge Progress
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default WeatherWatcher;
