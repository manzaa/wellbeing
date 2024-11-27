import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Grid, Paper, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BadgeIcon from '@mui/icons-material/EmojiEvents';
import axios from 'axios';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const BudgetBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#FFEB3B',
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const ItemCard = styled(Card)(({ theme }) => ({
    minWidth: 200,
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform 0.2s ease-in-out',
    },
}));

const BadgeCard = styled(Card)(({ theme }) => ({
    minWidth: 100,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: '#E1F5FE',
    color: theme.palette.text.primary,
}));

const BudgetBuddy = () => {
    const [budget, setBudget] = useState(Math.floor(Math.random() * (40 - 20 + 1) + 20));
    const [items, setItems] = useState([]);
    const [badges, setBadges] = useState([]);
    const [challenge, setChallenge] = useState(null);
    const [challengeId, setChallengeId] = useState(Math.floor(Math.random() * (10 - 1 + 1) + 1));
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const { data: challengeData } = await axios.get(process.env.REACT_APP_API_URL + '/api/budgetBuddy/challenge');
            setChallenge(challengeData);

            const { data: itemsData } = await axios.get(`${process.env.REACT_APP_API_URL}/api/budgetBuddy/items/${challengeId}`);
            setItems(itemsData);
            console.log("items", itemsData);
            const { data: badgesData } = await axios.get(process.env.REACT_APP_API_URL + '/api/budgetBuddy/badges');
            setBadges(badgesData);
        };

        fetchData();
    }, []);

    const handlePurchase = (price) => {
        if (budget >= price) {
            setBudget(budget - price);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
         <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>
            <Typography variant="h3" color="primary" textAlign="center" gutterBottom>
                {challenge ? challenge.title : 'Loading...'}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" textAlign="center" mb={3}>
                {challenge ? challenge.description : ''}
            </Typography>

            <Grid container spacing={3} justifyContent="center" mb={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <BudgetBox>
                        <ShoppingCartIcon fontSize="large" sx={{ mb: 1 }} />
                        <Typography variant="h5">Remaining Budget: ${budget.toFixed(2)}</Typography>
                    </BudgetBox>
                </Grid>
            </Grid>

            <Divider textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="h6" color="primary">Shopping List</Typography>
            </Divider>

            <Grid container spacing={3} justifyContent="center">
                {items.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                        <ItemCard>
                            <CardContent>
                                <Typography variant="h6" color="secondary" textAlign="center">{item.name}</Typography>
                                <Typography variant="subtitle1" color="textSecondary" textAlign="center">${Number(item.price).toFixed(2)}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => handlePurchase(item.price)}
                                    disabled={budget < item.price}
                                    sx={{ mt: 2 }}
                                >
                                    {budget >= item.price ? 'Buy' : 'Insufficient Funds'}
                                </Button>
                            </CardContent>
                        </ItemCard>
                    </Grid>
                ))}
            </Grid>

            {/* <Divider textAlign="center" sx={{ mt: 6, mb: 4 }}>
                <Typography variant="h6" color="primary">Earned Badges</Typography>
            </Divider> */}

            {/* <Grid container spacing={3} justifyContent="center">
                {badges.map((badge) => (
                    <Grid item key={badge.id} xs={6} sm={4} md={2}>
                        <BadgeCard>
                            <Avatar src={badge.icon} alt={badge.name} sx={{ width: 56, height: 56, mx: 'auto', mb: 1 }} />
                            <Typography variant="body1" fontWeight="bold">{badge.name}</Typography>
                        </BadgeCard>
                    </Grid>
                ))}
            </Grid> */}
        </Box>
    );
};

export default BudgetBuddy;
