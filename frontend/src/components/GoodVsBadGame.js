import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, Button, Grid, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

// Sample food items
const foodItems = [
    { id: 1, name: "Apple", type: "Good", img: "/images/apple.webp" },
    { id: 2, name: "Broccoli", type: "Good", img: "/images/broccoli.webp" },
    { id: 3, name: "Candy", type: "Bad", img: "/images/candy.webp" },
    { id: 4, name: "Pizza", type: "Bad", img: "/images/pizza.webp" },
    { id: 5, name: "Carrot", type: "Good", img: "/images/carrot.webp" },
    { id: 6, name: "Soda", type: "Bad", img: "/images/soda.webp" },
    // { id: 1, name: "Apple", type: "Good" },
    // { id: 2, name: "Broccoli", type: "Good" },
    // { id: 3, name: "Candy", type: "Bad" },
    // { id: 4, name: "Pizza", type: "Bad" },
    // { id: 5, name: "Carrot", type: "Good" },
    // { id: 6, name: "Soda", type: "Bad" },
];

// Function to shuffle items
const shuffleArray = (array) => {
    return array
        .map(item => ({ ...item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ sort, ...item }) => item);
};

// Food item component
const FoodItem = ({ item }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "food",
        item: { id: item.id, type: item.type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <Card ref={drag} sx={{ opacity: isDragging ? 0.5 : 1, width: 100, m: 1 }}>
            <CardContent>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '80px' }} />
                <Typography align="center">{item.name}</Typography>
            </CardContent>
        </Card>
    );
};

// Drop zone component
const DropZone = ({ type, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "food",
        drop: (item) => onDrop(item, type),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <Box
            ref={drop}
            sx={{
                p: 4,
                backgroundColor: isOver ? "lightgreen" : "#f5f5f5",
                border: "2px dashed #ccc",
                borderRadius: 4,
                minHeight: 200,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h6">{type === "Good" ? "Good to Eat" : "Bad to Eat"}</Typography>
        </Box>
    );
};

// Main Game Component
const GoodVsBadGame = () => {
    const [items, setItems] = useState([]);
    const [score, setScore] = useState(0);
    const [badgeEarned, setBadgeEarned] = useState(false);

    const userId = sessionStorage.getItem('userId');
    const scoreKey = `goodVsBadGameScore_${userId}`;
    const badgeKey = `goodVsBadGameBadge_${userId}`;

    useEffect(() => {
        // Shuffle food items and load score and badge for the specific user
        setItems(shuffleArray(foodItems));

        const storedScore = parseInt(sessionStorage.getItem(scoreKey), 10) || 0;
        const badgeData = JSON.parse(sessionStorage.getItem(badgeKey));

        setScore(storedScore);
        if (badgeData && new Date(badgeData.expires) > new Date()) {
            setBadgeEarned(true);
        }
    }, [userId, scoreKey, badgeKey]);

    const handleDrop = (item, dropType) => {
        const isCorrect = item.type === dropType;
        if (isCorrect) {
            setScore(prevScore => {
                const newScore = prevScore + 1;
                sessionStorage.setItem(scoreKey, newScore); // Save score for the specific user
                return newScore;
            });
        }
        setItems(prevItems => prevItems.filter(i => i.id !== item.id));
        if (score + 1 === 5 && !badgeEarned) {
            earnBadge();
        }
    };

    const earnBadge = () => {
        setBadgeEarned(true);
        const badgeData = { name: "Healthy Eater", expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) };
        sessionStorage.setItem(badgeKey, JSON.stringify(badgeData)); // Save badge for the specific user
    };

    const resetGame = () => {
        setItems(shuffleArray(foodItems));
        setScore(0);
        setBadgeEarned(false);
        sessionStorage.removeItem(scoreKey);
        sessionStorage.removeItem(badgeKey);
    };

    return (
        <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h3" gutterBottom>Good vs Bad Food Game</Typography>
            <Typography variant="h6">Score: {score}</Typography>
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={12} sm={6}>
                    <DropZone type="Good" onDrop={handleDrop} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DropZone type="Bad" onDrop={handleDrop} />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
                {items.map(item => (
                    <FoodItem key={item.id} item={item} />
                ))}
            </Box>

            {badgeEarned && (
                <Snackbar open={badgeEarned} autoHideDuration={4000}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Congratulations! You earned a "Healthy Eater" badge!
                    </Alert>
                </Snackbar>
            )}

            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={resetGame}>
                Reset Game
            </Button>
        </Box>
    );
};

const App = ({ userId }) => (
    <DndProvider backend={HTML5Backend}>
        <GoodVsBadGame userId={userId} />
    </DndProvider>
);

export default App;
