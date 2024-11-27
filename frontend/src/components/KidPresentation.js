import React, { useState, useEffect } from 'react';

// Main Component
const KidPresentation = () => {
  const [pose, setPose] = useState("neutral");
  const [talking, setTalking] = useState(false);
  const audioRef = React.useRef(null);

  // Load the audio file when the component mounts
  useEffect(() => {
    audioRef.current = new Audio(`${process.env.PUBLIC_URL}/sounds/talking.mp3`);
  }, []);

  // Function to start the presentation
  const startPresentation = () => {
    setPose("pointing"); // Start with pointing
    setTimeout(() => {
      setPose("talking"); // Switch to talking
      setTalking(true); // Start talking animation
      startTalkingAudio(); // Play audio
    }, 2000); // After 2 seconds
  };

  // Toggle talking animation every 500ms
  useEffect(() => {
    if (talking) {
      const talkingInterval = setInterval(() => {
        setPose(prevPose => (prevPose === "talking" ? "neutral" : "talking"));
      }, 500);

      return () => {
        clearInterval(talkingInterval);
        stopTalkingAudio(); // Stop audio when talking stops
      };
    }
  }, [talking]);

  // Function to start playing the talking audio
  const startTalkingAudio = () => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Loop audio while talking
      audioRef.current.play();
    }
  };

  // Function to stop the talking audio
  const stopTalkingAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start
    }
  };

  return (
    <div style={styles.classroom}>
      <h1 style={styles.title}>Kid Presentation Animation</h1>

      <div style={styles.kid}>
        <img
          src={`${process.env.PUBLIC_URL}/images/neutral.png`}
          alt="Kid Neutral Pose"
          style={{ ...styles.image, display: pose === "neutral" ? "block" : "none" }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/pointing.png`}
          alt="Kid Pointing Pose"
          style={{ ...styles.image, display: pose === "pointing" ? "block" : "none" }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/talking.png`}
          alt="Kid Talking Pose"
          style={{ ...styles.image, display: pose === "talking" ? "block" : "none" }}
        />
      </div>

      <button onClick={startPresentation} style={styles.button}>
        Start Presentation
      </button>
    </div>
  );
};

// Inline CSS styles
const styles = {
  classroom: {
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  kid: {
    position: "relative",
    marginBottom: "20px",
  },
  image: {
    width: "200px",
    position: "absolute",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default KidPresentation;
