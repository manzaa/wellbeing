import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Grid, Card, CardContent, Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Slide 
} from '@mui/material';
import axios from 'axios';

const EcoExplorer = ({ userId }) => {
    const [challenge, setChallenge] = useState(null);
    const [natureItems, setNatureItems] = useState([]);
    const [sightings, setSightings] = useState([]);
    const [badges, setBadges] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const { data: challengeData } = await axios.get(process.env.REACT_APP_API_URL + '/api/ecoExplorer/challenge');
            setChallenge(challengeData);

            const { data: natureItemsData } = await axios.get(process.env.REACT_APP_API_URL + '/api/ecoExplorer/natureItems');
            setNatureItems(natureItemsData);

            const { data: badgesData } = await axios.get(`${process.env.REACT_APP_API_URL}/api/ecoExplorer/badges/1`); //userid
            setBadges(badgesData);

            const { data: sightingsData } = await axios.get(`${process.env.REACT_APP_API_URL}/api/ecoExplorer/sightings/1`); //userid
            setSightings(sightingsData);
        };

        fetchData();
    }, [userId]);

    const handleLogSighting = (item) => {
        setSelectedItem(item);
        setDialogOpen(true);
    };

    const handleAddSighting = async () => {
        await axios.post(`/api/ecoExplorer/sightings/${userId}`, { item_id: selectedItem.id, location, notes });
        setDialogOpen(false);
        setLocation('');
        setNotes('');
        const { data: sightingsData } = await axios.get(`/api/ecoExplorer/sightings/${userId}`);
        setSightings(sightingsData);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" color="primary" textAlign="center" gutterBottom>
                {challenge ? challenge.title : 'Loading...'}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" textAlign="center" mb={3}>
                {challenge ? challenge.description : ''}
            </Typography>

            <Typography variant="h5" color="primary" mt={4}>Explore Nature Items</Typography>
            <Grid container spacing={3} mt={2}>
                {natureItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Slide direction="up" in={true} timeout={300}>
                            <Card>
                                <CardContent>
                                    <Avatar src={item.icon} alt={item.name} sx={{ width: 56, height: 56, mx: 'auto' }} />
                                    <Typography variant="h6" color="secondary" align="center">{item.name}</Typography>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleLogSighting(item)}
                                        sx={{ mt: 2 }}
                                        fullWidth
                                    >
                                        Log Sighting
                                    </Button>
                                </CardContent>
                            </Card>
                        </Slide>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" color="primary" mt={6}>Recent Sightings</Typography>
            <Grid container spacing={3} mt={2}>
                {sightings.map((sighting) => (
                    <Grid item xs={12} sm={6} md={4} key={sighting.id}>
                        <Card>
                            <CardContent>
                                <Avatar src={sighting.item_icon} alt={sighting.item_name} sx={{ width: 56, height: 56, mx: 'auto' }} />
                                <Typography variant="h6" color="secondary" align="center">{sighting.item_name}</Typography>
                                <Typography variant="body2" color="textSecondary" align="center">{sighting.location}</Typography>
                                <Typography variant="body2" color="textSecondary" align="center">{sighting.notes}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" color="primary" mt={6}>Earned Badges</Typography>
            <Grid container spacing={3} mt={2}>
                {badges.map((badge) => (
                    <Grid item xs={6} sm={4} md={3} key={badge.id}>
                        <Avatar src={badge.icon} alt={badge.name} sx={{ width: 64, height: 64, mx: 'auto' }} />
                        <Typography variant="body2" align="center">{badge.name}</Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Sighting Log Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Log Your Sighting</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Location"
                        fullWidth
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Notes"
                        fullWidth
                        multiline
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddSighting} color="primary">
                        Log Sighting
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EcoExplorer;
