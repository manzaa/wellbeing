import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogContent, DialogActions, Paper } from '@mui/material';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const scenarios = [
    {
        question: "Your parent just spent time helping you with homework. What's a good response?",
        options: [
            { answer: "Say 'Thank you!'", correct: true },
            { answer: "Ignore and go play", correct: false },
            { answer: "Say 'Do it faster next time!'", correct: false },
        ],
        explanation: "It's always nice to say thank you when someone helps you!"
    },
    {
        question: "Why do parents ask you to finish your food?",
        options: [
            { answer: "They want you to be healthy", correct: true },
            { answer: "They are just being mean", correct: false },
            { answer: "They don’t want you to have fun", correct: false },
        ],
        explanation: "Parents care about your health and want you to grow strong!"
    },
    {
        question: "Your parent asks you to clean your room. What should you do?",
        options: [
            { answer: "Clean it happily", correct: true },
            { answer: "Pretend to not hear", correct: false },
            { answer: "Make it messier", correct: false },
        ],
        explanation: "Keeping your room clean is part of being responsible and respectful!"
    },
    {
        question: "Why do parents remind you to brush your teeth?",
        options: [
            { answer: "So you can have a healthy smile", correct: true },
            { answer: "They enjoy nagging", correct: false },
            { answer: "It doesn't matter to them", correct: false },
        ],
        explanation: "Brushing helps you maintain a healthy smile and strong teeth."
    },
    {
        question: "Your parent is carrying groceries. What should you do?",
        options: [
            { answer: "Offer to help carry them", correct: true },
            { answer: "Run ahead and ignore them", correct: false },
            { answer: "Ask them to carry more", correct: false },
        ],
        explanation: "Helping shows kindness and appreciation for your parents."
    },
    {
        question: "When you disagree with your parents, you should:",
        options: [
            { answer: "Listen and talk calmly", correct: true },
            { answer: "Yell at them", correct: false },
            { answer: "Ignore them", correct: false },
        ],
        explanation: "Listening and calmly sharing your thoughts is respectful."
    },
    {
        question: "Your parents set a bedtime for you. Why do they do this?",
        options: [
            { answer: "To ensure you get enough sleep", correct: true },
            { answer: "They don’t want you to have fun", correct: false },
            { answer: "They like to make rules", correct: false },
        ],
        explanation: "Sleep helps you grow, stay healthy, and feel energized!"
    },
    {
        question: "Your parent made a special dinner. What should you say?",
        options: [
            { answer: "Thank you for the meal!", correct: true },
            { answer: "Why didn’t you make dessert?", correct: false },
            { answer: "I didn’t want this!", correct: false },
        ],
        explanation: "Thanking them shows appreciation for their effort and love."
    },
    {
        question: "If your parents ask you to finish homework before playtime, you should:",
        options: [
            { answer: "Finish homework first", correct: true },
            { answer: "Sneak outside to play", correct: false },
            { answer: "Say you’ll never do it", correct: false },
        ],
        explanation: "Doing homework first helps you learn responsibility."
    },
    {
        question: "Why do parents ask you to clean up your toys?",
        options: [
            { answer: "So you can find them easily next time", correct: true },
            { answer: "To make you work", correct: false },
            { answer: "They don’t like your toys", correct: false },
        ],
        explanation: "Keeping things tidy helps you find them and keeps your space safe!"
    },
    {
        question: "If your parent is on a work call, what should you do?",
        options: [
            { answer: "Play quietly nearby", correct: true },
            { answer: "Interrupt for fun", correct: false },
            { answer: "Talk loudly", correct: false },
        ],
        explanation: "Respecting their work time shows you care about their job."
    },
    {
        question: "Why do parents remind you to say 'please' and 'thank you'?",
        options: [
            { answer: "To teach good manners", correct: true },
            { answer: "To control you", correct: false },
            { answer: "Because they like those words", correct: false },
        ],
        explanation: "Manners show respect and help you get along with others."
    },
    {
        question: "Your parents are working hard around the house. What can you do?",
        options: [
            { answer: "Ask if they need help", correct: true },
            { answer: "Hide in your room", correct: false },
            { answer: "Tell them to work faster", correct: false },
        ],
        explanation: "Helping out shows kindness and appreciation for their efforts."
    },
    {
        question: "When your parents ask you to do chores, it helps you learn:",
        options: [
            { answer: "Responsibility", correct: true },
            { answer: "Nothing", correct: false },
            { answer: "How to be lazy", correct: false },
        ],
        explanation: "Chores teach you responsibility and independence!"
    },
    {
        question: "When your parents give advice, they do it because:",
        options: [
            { answer: "They care about your safety", correct: true },
            { answer: "They want to annoy you", correct: false },
            { answer: "They don’t trust you", correct: false },
        ],
        explanation: "Parents want the best for you and offer advice to keep you safe."
    },
    {
        question: "Your parent spends time helping you learn a new skill. What's a good response?",
        options: [
            { answer: "Thank them and practice more", correct: true },
            { answer: "Ignore them", correct: false },
            { answer: "Ask them to leave you alone", correct: false },
        ],
        explanation: "Thanking them and practicing shows appreciation and effort."
    },
    {
        question: "Why do parents encourage you to be kind to others?",
        options: [
            { answer: "Because kindness makes everyone feel good", correct: true },
            { answer: "To make life boring", correct: false },
            { answer: "To keep you from having fun", correct: false },
        ],
        explanation: "Being kind creates a happier world for everyone!"
    },
    {
        question: "If your parents ask you to follow rules, it's because:",
        options: [
            { answer: "Rules keep you safe and respectful", correct: true },
            { answer: "Rules are pointless", correct: false },
            { answer: "They just like control", correct: false },
        ],
        explanation: "Rules are there to help everyone stay safe and respectful."
    },
    {
        question: "When your parents share stories about their life, they want you to:",
        options: [
            { answer: "Learn from their experiences", correct: true },
            { answer: "Feel bored", correct: false },
            { answer: "Ignore their advice", correct: false },
        ],
        explanation: "Listening to their stories can teach you important life lessons."
    },
    {
        question: "When your parents remind you to say sorry after a mistake, it's to teach:",
        options: [
            { answer: "How to take responsibility", correct: true },
            { answer: "That they are never wrong", correct: false },
            { answer: "Nothing important", correct: false },
        ],
        explanation: "Saying sorry shows you understand your actions and care for others."
    }
];


const ParentRespectGame = () => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();

    const handleOptionClick = (isCorrect) => {
        setSelectedOption(isCorrect);
        setShowExplanation(true);
        if (isCorrect) {
            setScore(score + 1);
            setShowConfetti(true);
        }
    };

    const handleNextScenario = () => {
        setShowExplanation(false);
        setSelectedOption(null);
        setShowConfetti(false);
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(currentScenario + 1);
        } else {
            // Game Over
            alert(`Game Over! Your final score is: ${score}/${scenarios.length}`);
            setCurrentScenario(0);
            setScore(0);
        }
    };

    const { question, options, explanation } = scenarios[currentScenario];

    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 5 }}>
            <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>

            {showConfetti && <Confetti recycle={false} />}

            <Typography variant="h4" sx={{ mb: 3, color: '#1976d2' }}>
                Respect Your Parents Game
            </Typography>

            <Paper elevation={3} sx={{ p: 4, width: '80%', maxWidth: 500, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{question}</Typography>
                
                {options.map((option, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        color={selectedOption === option.correct ? (option.correct ? 'success' : 'error') : 'primary'}
                        sx={{ mb: 1, width: '100%', fontSize: '1rem' }}
                        onClick={() => handleOptionClick(option.correct)}
                        disabled={selectedOption !== null}
                    >
                        {option.answer}
                    </Button>
                ))}

                <Dialog open={showExplanation} onClose={handleNextScenario}>
                    <DialogContent>
                        <Typography variant="body1">{explanation}</Typography>
                        {selectedOption && (
                            <Typography variant="body1" color="success.main">
                                Great choice! 🎉
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleNextScenario} color="primary">Next</Button>
                    </DialogActions>
                </Dialog>
            </Paper>

            <Typography variant="h6" sx={{ mt: 3, color: '#1976d2' }}>Score: {score}</Typography>
        </Box>
    );
};

export default ParentRespectGame;
