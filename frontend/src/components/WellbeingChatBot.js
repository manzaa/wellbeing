import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const WellbeingChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I help you today?' }]);
    const [isListening, setIsListening] = useState(false);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;
    const navigate = useNavigate();

    useEffect(() => {
        // Setup Speech Recognition
        if (recognition) {
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                sendMessage(transcript); // Send the recognized speech as input
            };
            recognition.onend = () => setIsListening(false);
            recognition.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                setIsListening(false);
            };
        }
    }, [recognition]);

    const startListening = () => {
        if (recognition) {
            setIsListening(true);
            recognition.start();
        }
    };

    const sendMessage = async (message) => {
        if (!message.trim()) return;

        // Add user's message to the chat
        setMessages([...messages, { sender: 'user', text: message }]);

        try {
            // Send user's input to the backend to get a response
            const response = await axios.post(process.env.REACT_APP_API_URL + '/api/chat/response', { inputText: message });
            const botMessage = response.data.answer;

            // Add the bot's response to the chat and speak it out
            setMessages((prev) => [...prev, { sender: 'bot', text: botMessage }]);
            speak(botMessage);
        } catch (error) {
            console.error('Error fetching response:', error);
            const errorMessage = "Sorry, I couldn't understand that. Can you ask in a different way?";
            setMessages((prev) => [...prev, { sender: 'bot', text: errorMessage }]);
            speak(errorMessage);
        }

        // Clear the input field
        setInput('');
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-US';
            window.speechSynthesis.speak(speech);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', mt: 5 }}>
             <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>
             <Typography variant="h4" align="center" gutterBottom>Kid's Well-being Assistant</Typography>
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index} sx={{ justifyContent: msg.sender === 'bot' ? 'flex-start' : 'flex-end' }}>
                        <ListItemText
                            primary={msg.text}
                            sx={{
                                backgroundColor: msg.sender === 'bot' ? '#e3f2fd' : '#bbdefb',
                                padding: '10px',
                                borderRadius: '10px',
                                maxWidth: '70%',
                            }}
                        />
                    </ListItem>
                ))}
            </List>

            <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                />
                <IconButton color="primary" onClick={() => sendMessage(input)}>
                    <SendIcon />
                </IconButton>
                <IconButton color="secondary" onClick={startListening} disabled={isListening}>
                    <MicIcon />
                </IconButton>
            </Box>

            <Button 
                variant="outlined"
                onClick={() => speak("Hello! I am your well-being assistant. How can I help you today?")}
                sx={{ mt: 2 }}
            >
                Hear Greeting
            </Button>
        </Box>
    );
};

export default WellbeingChatBot;
