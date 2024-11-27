import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Snackbar, Alert, Button } from '@mui/material';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const dailyActivities = [
    { id: 1, name: "Brush Teeth", time: "Morning", img: "/images/brush-teeth.webp" },
    { id: 2, name: "Eat Breakfast", time: "Morning", img: "/images/breakfast.webp" },
    { id: 3, name: "Do Exercise", time: "Morning", img: "/images/exercise.webp" },
    { id: 4, name: "Study", time: "Afternoon", img: "/images/study.webp" },
    { id: 5, name: "Eat Lunch", time: "Afternoon", img: "/images/lunch.webp" },
    { id: 6, name: "Play with Friends", time: "Afternoon", img: "/images/play.webp" },
    { id: 7, name: "Snack Time", time: "Evening", img: "/images/snack.webp" },
    { id: 8, name: "Homework", time: "Evening", img: "/images/homework.webp" },
    { id: 9, name: "Dinner with Family", time: "Evening", img: "/images/dinner.webp" },
    { id: 10, name: "Read a Book", time: "Night", img: "/images/read.webp" },
    { id: 11, name: "Brush Teeth Before Bed", time: "Night", img: "/images/brush-teeth.webp" },
    { id: 12, name: "Sleep", time: "Night", img: "/images/sleep.webp" },
];

const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];

const shuffleActivities = (activities) => {
    const shuffled = [...activities];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const ActivityItem = ({ activity }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "activity",
        item: { id: activity.id, time: activity.time },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <Card ref={drag} sx={{ opacity: isDragging ? 0.5 : 1, width: 100, m: 1 }}>
            <CardContent>
                <img src={activity.img} alt={activity.name} style={{ width: '100%', height: '80px' }} />
                <Typography align="center">{activity.name}</Typography>
            </CardContent>
        </Card>
    );
};

const TimeSlot = ({ time, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "activity",
        drop: (item) => onDrop(item, time),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <Box
            ref={drop}
            sx={{
                p: 2,
                backgroundColor: isOver ? "lightblue" : "#f5f5f5",
                border: "2px dashed #ccc",
                borderRadius: 4,
                minHeight: 200,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
            }}
        >
            <Typography variant="h6" sx={{ mb: 1 }}>{time}</Typography>
        </Box>
    );
};

const HealthyRoutineGame = () => {
    const [activities, setActivities] = useState([]);
    const [score, setScore] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const userId = sessionStorage.getItem('userId');

    const scoreKey = `healthyRoutineScore_${userId}`;
    const badgeKey = `healthyRoutineBadge_${userId}`;

    useEffect(() => {
        setActivities(shuffleActivities(dailyActivities));

        const storedScore = parseInt(sessionStorage.getItem(scoreKey), 10) || 0;
        setScore(storedScore);

        const earnedBadge = sessionStorage.getItem(badgeKey);
        if (earnedBadge) setSnackbarOpen(true);
    }, [userId, scoreKey, badgeKey]);

    const handleDrop = (item, dropTime) => {
        const isCorrect = item.time === dropTime;
        if (isCorrect) {
            setScore(prevScore => {
                const newScore = prevScore + 1;
                sessionStorage.setItem(scoreKey, newScore); // Save score for the specific user
                return newScore;
            });
        }
        setActivities(prevActivities => prevActivities.filter(activity => activity.id !== item.id));

        if (score + 1 === dailyActivities.length) {
            sessionStorage.setItem(badgeKey, "earned"); // Save badge for the specific user
            setSnackbarOpen(true);
        }
    };

    const resetGame = () => {
        setActivities(shuffleActivities(dailyActivities));
        setScore(0);
        setSnackbarOpen(false);
        sessionStorage.removeItem(scoreKey);
        sessionStorage.removeItem(badgeKey);
    };

    return (
        <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h3" gutterBottom>Healthy Daily Routine Game</Typography>
            <Typography variant="h6">Score: {score}</Typography>
            
            <Grid container spacing={2} sx={{ my: 2 }}>
                {timeSlots.map(slot => (
                    <Grid item xs={12} sm={6} md={3} key={slot}>
                        <TimeSlot time={slot} onDrop={handleDrop} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
                {activities.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </Box>

            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={resetGame}>
                Reset Game
            </Button>

            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    <CheckCircleOutlineIcon /> Well done! You’ve completed your Healthy Routine and earned a badge!
                </Alert>
            </Snackbar>
        </Box>
    );
};

const App = ({ userId }) => (
    <DndProvider backend={HTML5Backend}>
        <HealthyRoutineGame userId={userId} />
    </DndProvider>
);

export default App;
