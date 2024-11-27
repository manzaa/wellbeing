// src/StressReliefGames.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Slider, IconButton } from '@mui/material';

const StressReliefGames = () => {
  const [activeGame, setActiveGame] = useState('natureSoundMixer');
  const [rain, setRain] = useState(30);
  const [ocean, setOcean] = useState(50);
  const [birds, setBirds] = useState(20);
  const [selectedColor, setSelectedColor] = useState('#80deea');
  const [prompt, setPrompt] = useState("What are three things you're grateful for today?");
  const [stretch, setStretch] = useState({ name: "Neck Stretch", description: "Slowly tilt your head to each side, stretching your neck." });
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [quote, setQuote] = useState("Breathe in peace, breathe out stress.");

  const colors = ['#ffb6c1', '#80deea', '#a5d6a7', '#ffd54f', '#f8bbd0'];
  const prompts = [
    "What are three things you're grateful for today?",
    "Describe a moment today that made you smile.",
    "What is one challenge you're facing, and how can you approach it positively?",
    "Write about a place that makes you feel at peace.",
    "What is a small victory you achieved today?",
  ];
  const stretches = [
    { name: "Neck Stretch", description: "Slowly tilt your head to each side, stretching your neck." },
    { name: "Shoulder Shrugs", description: "Raise your shoulders up towards your ears and release." },
    { name: "Forward Bend", description: "Stand up, bend forward, and reach towards your toes." },
    { name: "Side Stretch", description: "Raise one arm overhead and lean to the opposite side." },
  ];
  const quotes = [
    "Breathe in peace, breathe out stress.",
    "This too shall pass.",
    "Embrace the calm within.",
    "One day at a time.",
    "You have the strength you need.",
  ];

  useEffect(() => {
    let interval;
    if (activeGame === 'focusTimer' && timerActive && time > 0) {
      interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [activeGame, timerActive, time]);

  const handleColorChange = () => {
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    setSelectedColor(nextColor);
  };

  const getRandomPrompt = () => setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  const getNextStretch = () => setStretch(stretches[Math.floor(Math.random() * stretches.length)]);
  const getNewQuote = () => setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  const toggleTimer = () => setTimerActive((prev) => !prev);

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h4" gutterBottom>Stress Relief Games</Typography>
      <Box mb={3}>
        <Button variant="contained" onClick={() => setActiveGame('natureSoundMixer')}>Nature Sound Mixer</Button>
        <Button variant="contained" onClick={() => setActiveGame('mandalaColoring')} sx={{ ml: 1 }}>Mandala Coloring</Button>
        <Button variant="contained" onClick={() => setActiveGame('journalingPrompt')} sx={{ ml: 1 }}>Journaling Prompt</Button>
        <Button variant="contained" onClick={() => setActiveGame('stretchingGuide')} sx={{ ml: 1 }}>Stretching Guide</Button>
        <Button variant="contained" onClick={() => setActiveGame('focusTimer')} sx={{ ml: 1 }}>Focus Timer</Button>
        <Button variant="contained" onClick={() => setActiveGame('soothingQuotes')} sx={{ ml: 1 }}>Soothing Quotes</Button>
      </Box>

      {activeGame === 'natureSoundMixer' && (
        <Box textAlign="center">
          <Typography variant="h5">Nature Sound Mixer</Typography>
          <Typography gutterBottom>Rain</Typography>
          <Slider value={rain} onChange={(e, newValue) => setRain(newValue)} />
          <Typography gutterBottom>Ocean Waves</Typography>
          <Slider value={ocean} onChange={(e, newValue) => setOcean(newValue)} />
          <Typography gutterBottom>Birdsong</Typography>
          <Slider value={birds} onChange={(e, newValue) => setBirds(newValue)} />
        </Box>
      )}

      {activeGame === 'mandalaColoring' && (
        <Box textAlign="center">
          <IconButton
            onClick={handleColorChange}
            sx={{
              width: 100,
              height: 100,
              backgroundColor: selectedColor,
              borderRadius: '50%',
            }}
          ></IconButton>
          <Typography mt={2}>Click to change colors</Typography>
        </Box>
      )}

      {activeGame === 'journalingPrompt' && (
        <Box textAlign="center">
          <Typography variant="h5">Journaling Prompt</Typography>
          <Typography mt={2}>{prompt}</Typography>
          <Button variant="contained" color="primary" onClick={getRandomPrompt} sx={{ mt: 2 }}>
            New Prompt
          </Button>
        </Box>
      )}

      {activeGame === 'stretchingGuide' && (
        <Box textAlign="center">
          <Typography variant="h5">Stretching Guide</Typography>
          <Typography mt={2} variant="h6">{stretch.name}</Typography>
          <Typography mt={1}>{stretch.description}</Typography>
          <Button variant="contained" color="primary" onClick={getNextStretch} sx={{ mt: 2 }}>
            Next Stretch
          </Button>
        </Box>
      )}

      {activeGame === 'focusTimer' && (
        <Box textAlign="center">
          <Typography variant="h5">Focus Timer</Typography>
          <Typography mt={2} variant="h2">
            {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
          </Typography>
          <Button variant="contained" color="primary" onClick={toggleTimer} sx={{ mt: 2 }}>
            {timerActive ? "Pause" : "Start"}
          </Button>
        </Box>
      )}

      {activeGame === 'soothingQuotes' && (
        <Box textAlign="center">
          <Typography variant="h5">Soothing Quotes</Typography>
          <Typography mt={2} fontStyle="italic">{quote}</Typography>
          <Button variant="contained" color="primary" onClick={getNewQuote} sx={{ mt: 2 }}>
            New Quote
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default StressReliefGames;
