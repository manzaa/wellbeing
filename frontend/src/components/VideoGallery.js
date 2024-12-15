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
  // Add other videos as needed
];

const isSubscribed = localStorage.getItem('subscribed'); // Check subscription status
const VideoGallery = () => {
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
    if (isSubscribed == 0) {
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
            disabled={isSubscribed == 0 && currentVideoIndex === 0} // Disable Next only if it's the first video for unsubscribed users
          >
            Next
          </Button>
        </CardActions>
      </Box>

      {isSubscribed == 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={handleSubscribe}>
            Subscribe Now
          </Button>
        </Box>
      )}

      {/* Show Subscribe Alert */}
      {showSubscribeAlert && isSubscribed == 0 && (
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
