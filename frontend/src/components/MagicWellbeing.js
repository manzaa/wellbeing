import React, { useState } from "react";
import { Container, Grid, Box, Typography, Button, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { Player } from "lottie-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import healthySnackAnimation from "./animations/healthySnack.json";
import energyBarAnimation from "./animations/energyBar.json";
import balloonAnimation from "./animations/balloon.json";
import kindnessAnimation from "./animations/kindness.json";
console.log("Player component:", Player); // Check if Player is properly imported
const magicThemes = [
  {
    id: 1,
    title: "Healthy Eating Magic",
    description: "Transform unhealthy snacks into fruits and vegetables!",
    animation: healthySnackAnimation,
    hint: "Drag the candy into the magic hat!",
  },
  {
    id: 2,
    title: "Exercise is Magic",
    description: "Unlock your energy through movement magic!",
    animation: energyBarAnimation,
    hint: "Mimic the movements shown on the screen to fill the magic energy bar.",
  },
  {
    id: 3,
    title: "Stress Balloon Trick",
    description: "Calm your stress by practicing magical deep breaths.",
    animation: balloonAnimation,
    hint: "Blow into the microphone to deflate the stress balloon.",
  },
  {
    id: 4,
    title: "Kindness Ripple Effect",
    description: "Watch how kindness multiplies!",
    animation: kindnessAnimation,
    hint: "Drop a coin into the box and see the magic of kindness spread.",
  },
];

const MagicWellbeing = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [completed, setCompleted] = useState([]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <Typography>Your browser does not support speech recognition.</Typography>;
  }

  const handleComplete = (themeId) => {
    if (!completed.includes(themeId)) {
      setCompleted([...completed, themeId]);
      alert("Congratulations! You completed the magic trick!");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Well-Being Magic Show 🌟🎩
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Explore magic tricks that teach you about health, emotions, and kindness!
        </Typography>
      </Box>

      {/* Magic Themes */}
      <Grid container spacing={4}>
        {magicThemes.map((theme) => (
          <Grid item xs={12} sm={6} md={4} key={theme.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Tooltip title={theme.hint} arrow>
                <Box
                  sx={{
                    borderRadius: 4,
                    p: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: 3,
                    "&:hover": { boxShadow: 6 },
                    bgcolor: selectedTheme?.id === theme.id ? "primary.light" : "white",
                  }}
                  onClick={() => setSelectedTheme(theme)}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {theme.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {theme.description}
                  </Typography>
                  <Player
                    autoplay
                    loop
                    src={theme.animation}
                    style={{ height: 120, width: 120 }}
                  />
                </Box>
              </Tooltip>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Selected Theme Display */}
      {selectedTheme && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {selectedTheme.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            {selectedTheme.description}
          </Typography>

          {/* Interaction Area */}
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={() => handleComplete(selectedTheme.id)}
            style={{
              width: 120,
              height: 120,
              background: "linear-gradient(135deg, #6C63FF, #957DFF)",
              borderRadius: "50%",
              display: "inline-block",
              margin: "0 auto",
            }}
          >
            <Typography
              sx={{ color: "white", lineHeight: "120px", fontWeight: "bold", fontSize: "16px" }}
            >
              Drag Me!
            </Typography>
          </motion.div>

          {/* Speech Recognition */}
          <Box mt={4}>
            <Typography variant="h6">Talk to the Magic!</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => SpeechRecognition.startListening({ continuous: true })}
              sx={{ mt: 2, mr: 2 }}
            >
              {listening ? "Listening..." : "Start Voice Command"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={resetTranscript}>
              Reset Voice Command
            </Button>
            <Typography sx={{ mt: 2 }}>Command: {transcript}</Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default MagicWellbeing;
