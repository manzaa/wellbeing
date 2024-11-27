import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Button, Tooltip, Card, CardContent } from '@mui/material';
import axios from 'axios';

const AdventureMap = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/api/locations');
            setLocations(response.data);
        };
        fetchLocations();
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h3" gutterBottom>Magical Adventure Map</Typography>
            <Grid container spacing={2}>
                {locations.map((location) => (
                    <Grid item xs={12} sm={6} md={4} key={location.id}>
                        <Tooltip title={location.theme}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{location.name}</Typography>
                                    {location.is_locked ? (
                                        <Button variant="outlined" color="error" disabled>Locked</Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            to={`/location/1`} //locationid
                                        >
                                            Explore
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdventureMap;
