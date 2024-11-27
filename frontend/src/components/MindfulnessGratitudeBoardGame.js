import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Snackbar } from '@mui/material';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const items = [
    { id: 1, type: 'Mindfulness', content: "Take a deep breath and relax." },
    { id: 2, type: 'Gratitude', content: "Name 3 things you're grateful for." },
    { id: 3, type: 'Mindfulness', content: "Describe how you feel right now." },
    { id: 4, type: 'Gratitude', content: "Think of someone you appreciate." },
    { id: 5, type: 'Mindfulness', content: "Close your eyes and listen to sounds around you." },
    { id: 6, type: 'Gratitude', content: "Share something nice someone did for you." },
    { id: 7, type: 'Mindfulness', content: "Picture a happy memory." },
    { id: 8, type: 'Gratitude', content: "Name a skill you’re thankful for." },
    { id: 9, type: 'Mindfulness', content: "Notice how your body feels." },
    { id: 10, type: 'Gratitude', content: "What’s one thing you love about your family?" },
    { id: 11, type: 'Mindfulness', content: "Take 3 slow breaths." },
    { id: 12, type: 'Gratitude', content: "Think of a favorite place you love." },
    { id: 13, type: 'Mindfulness', content: "Imagine your favorite color." },
    { id: 14, type: 'Gratitude', content: "Name someone who helped you recently." },
    { id: 15, type: 'Mindfulness', content: "Take a moment to relax your muscles." },
    { id: 16, type: 'Gratitude', content: "Think of a friend who makes you smile." },
    { id: 17, type: 'Mindfulness', content: "Sit still and listen to your breathing." },
    { id: 18, type: 'Gratitude', content: "What’s something nice you did for someone?" },
    { id: 19, type: 'Mindfulness', content: "Picture your favorite peaceful place." },
    { id: 20, type: 'Gratitude', content: "Share a favorite family tradition." }
];

const Item = ({ content, id, type }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { id, type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <Paper
            ref={drag}
            sx={{
                padding: 2,
                margin: 1,
                backgroundColor: isDragging ? '#e0e0e0' : '#ffffff',
                border: '1px solid #ddd',
                cursor: 'pointer',
                opacity: isDragging ? 0.5 : 1
            }}
        >
            <Typography>{content}</Typography>
        </Paper>
    );
};

const DropZone = ({ type, onDrop, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => onDrop(item, type),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));

    return (
        <Box
            ref={drop}
            sx={{
                padding: 2,
                minHeight: 150,
                backgroundColor: isOver ? '#f0f4f8' : '#e3f2fd',
                borderRadius: 2,
                border: '2px dashed #90caf9',
                textAlign: 'center'
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>{children}</Typography>
        </Box>
    );
};

const MindfulnessGratitudeSortingGame = () => {
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [feedback, setFeedback] = useState({ open: false, message: '' });
    const [completedItems, setCompletedItems] = useState([]);
    const navigate = useNavigate();

    const handleDrop = (item, dropZoneType) => {
        if (item.type === dropZoneType) {
            setScore(score + 10);
            setFeedback({ open: true, message: 'Great job! You got it right!' });
        } else {
            setFeedback({ open: true, message: 'Oops, try again!' });
        }
        setCompletedItems((prev) => [...prev, item.id]);

        // Show confetti on full score
        if (score + 10 >= items.length * 10) {
            setShowConfetti(true);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
                        <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 5 }}>
                {showConfetti && <Confetti recycle={false} />}
                
                <Typography variant="h4" sx={{ mb: 3, color: '#1976d2' }}>
                    Mindfulness & Gratitude Sorting Game
                </Typography>

                <Typography variant="h6" sx={{ color: '#4caf50' }}>Score: {score}</Typography>

                <Box display="flex" flexDirection="row" justifyContent="space-around" width="100%" mt={3}>
                    <DropZone type="Mindfulness" onDrop={handleDrop}>Mindfulness</DropZone>
                    <DropZone type="Gratitude" onDrop={handleDrop}>Gratitude</DropZone>
                </Box>

                <Box display="flex" flexWrap="wrap" justifyContent="center" mt={3} width="100%">
                    {items.map((item) =>
                        completedItems.includes(item.id) ? null : (
                            <Item key={item.id} content={item.content} id={item.id} type={item.type} />
                        )
                    )}
                </Box>

                <Snackbar
                    open={feedback.open}
                    autoHideDuration={2000}
                    onClose={() => setFeedback({ open: false, message: '' })}
                    message={feedback.message}
                />
            </Box>
        </DndProvider>
    );
};

export default MindfulnessGratitudeSortingGame;
