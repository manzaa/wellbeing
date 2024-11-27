import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Chip,
  CircularProgress,
  Tooltip,
  Divider,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PrintIcon from '@mui/icons-material/Print';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const WellbeingChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState(null);
  const [recentHints, setRecentHints] = useState([]);

  const interactionSuggestions = [
    "What is stress?",
    "Tell me about hydration.",
    "How can I stay healthy?",
    "What foods are good for energy?",
    "What is physical activity?",
  ];

  // Load the dataset
  useEffect(() => {
    fetch('/wellbeing_large_dataset.json')
      .then((response) => response.json())
      .then((data) => {
        setDataset(data);
        console.log("Dataset loaded successfully");
      })
      .catch((error) => console.error('Error loading dataset:', error));
  }, []);

  // Handle sending user input
  const handleSend = () => {
    if (!userInput.trim() || !dataset) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    const response = getResponse(userInput);
    setTimeout(() => {
      const hints = getRandomHints(dataset, 2);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: response.text },
        ...hints.map(({ hint, topic }) => ({
          sender: 'bot',
          text: `Hint (${topic}): ${hint}`,
        })),
      ]);
      setLoading(false);
    }, 1000);
  };

  // Fetch a response based on user input
  const getResponse = (input) => {
    input = input.toLowerCase();

    if (!dataset) {
      return { text: "Dataset is not loaded. Please try again later." };
    }

    // Match input with hints
    for (const [category, topics] of Object.entries(dataset)) {
      for (const [subtopic, entries] of Object.entries(topics)) {
        for (const entry of entries) {
          if (input === entry.hint.toLowerCase()) {
            return { text: entry.response };
          }
        }
      }
    }

    // Match input with keywords and subtopics
    for (const [category, topics] of Object.entries(dataset)) {
      for (const [subtopic, entries] of Object.entries(topics)) {
        if (input.includes(subtopic)) {
          const randomEntry = entries[Math.floor(Math.random() * entries.length)];
          return { text: randomEntry.response };
        }
        for (const entry of entries) {
          if (entry.keywords.some((keyword) => input.includes(keyword))) {
            return { text: entry.response };
          }
        }
      }
    }

    // Match input with category
    for (const [category, topics] of Object.entries(dataset)) {
      if (input.includes(category)) {
        const allResponses = Object.values(topics).flat();
        const randomEntry = allResponses[Math.floor(Math.random() * allResponses.length)];
        return { text: randomEntry.response };
      }
    }

    // Fallback response
    return { text: "I'm here to help! Can you ask your question differently?" };
  };

  // Get random hints while avoiding recent hints
  const getRandomHints = (dataset, count = 2) => {
    const hints = [];
    for (const [category, topics] of Object.entries(dataset)) {
      for (const [subtopic, entries] of Object.entries(topics)) {
        entries.forEach((entry) => {
          hints.push({ hint: entry.hint, topic: `${category} > ${subtopic}` });
        });
      }
    }

    const uniqueHints = hints.filter(
      (hintObj) => !recentHints.includes(hintObj.hint)
    );

    const selectedHints = uniqueHints
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    setRecentHints((prevHints) => [
      ...prevHints,
      ...selectedHints.map((hintObj) => hintObj.hint),
    ]);

    return selectedHints;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const printTranscript = () => {
    const transcript = messages
      .map((msg) => `${msg.sender === 'user' ? 'You' : 'Chatbot'}: ${msg.text}`)
      .join('\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'chat_transcript.txt';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
        Well-Being Chatbot
      </Typography>

      {/* Suggestions */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        {interactionSuggestions.map((suggestion, index) => (
          <Chip
            key={index}
            label={suggestion}
            color="primary"
            variant="outlined"
            onClick={() => setUserInput(suggestion)}
            sx={{ mx: 0.5, cursor: 'pointer' }}
          />
        ))}
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Chat Window */}
      <Paper elevation={3} sx={{ p: 2, height: '400px', overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            textAlign={msg.sender === 'user' ? 'right' : 'left'}
            sx={{ my: 1 }}
          >
            <Tooltip title={msg.sender === 'bot' && msg.text.startsWith('Hint') ? 'Click to ask this!' : ''}>
              <Chip
                label={msg.text}
                color={msg.sender === 'user' ? 'primary' : 'secondary'}
                icon={msg.sender === 'bot' && <LightbulbIcon />}
                sx={{
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  cursor: msg.text.startsWith('Hint') ? 'pointer' : 'default',
                }}
                onClick={() =>
                  msg.text.startsWith('Hint') && setUserInput(msg.text.replace(/Hint \(.*\): /, ''))
                }
              />
            </Tooltip>
          </Box>
        ))}
        {loading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={24} />
          </Box>
        )}
      </Paper>

      {/* Input and Controls */}
      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your question here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ mr: 1 }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>

      {/* Print Transcript */}
      <Box textAlign="center">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PrintIcon />}
          onClick={printTranscript}
        >
          Print Transcript
        </Button>
      </Box>
    </Container>
  );
};

export default WellbeingChatbot;
