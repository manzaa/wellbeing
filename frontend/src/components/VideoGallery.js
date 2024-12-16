import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  CardActions,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const videos = [
  { title: "Boosting Confidence in Kids and Teens", path: "/videos/Boosting Confidence in Kids and Teens_ T 2024-11-09.mp4" },
  { title: "Friendship & Social Skills for Kids", path: "/videos/Friendship & Social Skills for Kids_ Goo 2024-11-09.mp4" },
  { title: "Gratitude and Positive Thinking for Kids", path: "/videos/Gratitude and Positive Thinking for Kids 2024-11-09.mp4" },
  { title: "Healthy Body Image & Self-Care for Kids", path: "/videos/Healthy Body Image & Self-Care for Kids  2024-11-09.mp4" },
  { title: "Healthy Eating for Kids & Teens", path: "/videos/Healthy Eating for Kids & Teens_ Fueling 2024-11-09.mp4" },
  { title: "Healthy Screen Time Tips for Kids & Teen", path: "/videos/Healthy Screen Time Tips for Kids & Teen 2024-11-09.mp4" },
  { title: "Healthy Sleep Habits for Kids & Teens", path: "/videos/Healthy Sleep Habits for Kids & Teens 2024-11-09.mp4" },
  { title: "Kids & Teens_ Fun Ways to Stay Active!", path: "/videos/Kids & Teens_ Fun Ways to Stay Active! 2024-11-09.mp4" },
  { title: "Mastering Emotions, A Guide for Kids", path: "/videos/Mastering Emotions_ A Guide for Kids & T 2024-11-09.mp4" },
  { title: "Mindfulness & Relaxation for Kids and Teens", path: "/videos/Mindfulness & Relaxation for Kids and Te 2024-11-09.mp4" },
  { title: "Stay Safe, Stay Smart_ Safety Tips for Kids", path: "/videos/Stay Safe, Stay Smart_ Safety Tips for K 2024-11-09.mp4" },
  { title: "Stress and Anxiety Tips for Kids", path: "/videos/Stress and Anxiety Tips for Kids_ Good v 2024-11-09.mp4" },
  { title: "Top Tips for Developing Good Study Habit", path: "/videos/Top Tips for Developing Good Study Habit 2024-11-09.mp4" },
  { title: "Let's Save Our Planet! 🌍", path: "/videos/Save Our Planet.mp4" },
  { title: "Building Healthy Family Relationships for Kids and Teens", path: "/videos/Building Healthy Family Relationships fo 2024-11-09.mp4" },
  { title: "Be Kind and Respectful, A Guide for Kids", path: "/videos/Be Kind and Respectful_ A Guide for Kids 2024-11-09.mp4" },
  { title: "Unleashing Creativity, A Health Boost for Kids", path: "/videos/Unleashing Creativity_ A Health Boost fo 2024-11-09.mp4" },
  { title: "Developing a Growth Mindset, Tips for Kids", path: "/videos/Developing a Growth Mindset_ Tips for Ki 2024-11-09.mp4" },
  { title: "Understanding Cultural Diversity for Kids", path: "/videos/Understanding Cultural Diversity for Kid 2024-11-09.mp4" },
  { title: "Personal Hygiene & Self-Care Tips for Kids", path: "/videos/Personal Hygiene & Self-Care Tips for Ki 2024-11-09.mp4" }
];

// Fix: Ensure isSubscribed is correctly interpreted as null or 1
const isSubscribed = localStorage.getItem('subscribed') === '1' ? 1 : null;

const VideoGallery = () => {
  console.log("subscribed", isSubscribed);
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showSubscribeAlert, setShowSubscribeAlert] = useState(false);
  const videoRef = React.createRef();

  const handleSubscribe = () => {
    navigate('/subscribe');
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent right-click
  };

  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent dragging of the video
  };

  const handleNextClick = () => {
    if (isSubscribed == null) {
      setShowSubscribeAlert(true); // Show subscribe alert for unsubscribed users
    } else if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1); // Move to the next video if subscribed
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" color="primary" gutterBottom>
        Wellbeing Video Insights
      </Typography>
      <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mb: 4 }}>
        {isSubscribed === 1
          ? "Browse through our complete collection of Wellbeing videos below."
          : "Enjoy our free video! Subscribe to access the full collection."}
      </Typography>

      <Box sx={{ maxWidth: '100%', overflow: 'hidden', textAlign: 'center' }}>
        <video
          ref={videoRef}
          key={currentVideoIndex} // Force re-render on index change
          width="100%"
          height="auto"
          controls
          preload="auto"
          controlsList="nodownload"
          style={{ borderRadius: '4px' }}
          onContextMenu={handleContextMenu} // Disable right-click
          onDragStart={handleDragStart} // Disable drag
        >
          <source src={videos[currentVideoIndex].path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Title */}
        <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
          {videos[currentVideoIndex].title}
        </Typography>

        <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
          {currentVideoIndex > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCurrentVideoIndex(currentVideoIndex - 1)}
              sx={{ marginRight: 2 }}
            >
              Previous
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
            disabled={isSubscribed === null && currentVideoIndex === 0} // Disable Next only if it's the first video for unsubscribed users
          >
            Next
          </Button>
        </CardActions>
      </Box>

      {isSubscribed === null && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={handleSubscribe}>
            Subscribe Now
          </Button>
        </Box>
      )}

      {/* Show Subscribe Alert */}
      {showSubscribeAlert && isSubscribed === null && (
        <Alert
          severity="warning"
          onClose={() => setShowSubscribeAlert(false)} // Close the alert
          sx={{ mt: 2 }}
        >
          Subscribe to unlock the full video library!
        </Alert>
      )}
    </Container>
  );
};

export default VideoGallery;
