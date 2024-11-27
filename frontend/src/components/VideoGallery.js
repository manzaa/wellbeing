import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Grid,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LockIcon from '@mui/icons-material/Lock';
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

const isSubscribed = localStorage.getItem('subscribed');
console.log("subscribed", isSubscribed, localStorage.getItem('subscribed'));
const VideoGallery = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate('/subscribe');
  };

  const handlePlayPause = (videoRef) => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleMuteUnmute = (videoRef) => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" color="primary" gutterBottom>
        Wellbeing Video Insights
      </Typography>
      <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mb: 4 }}>
        Browse through our collection of Wellbeing videos below.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {videos.map((video, index) => {
          const videoRef = React.createRef();

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, position: 'relative' }}>
                <CardMedia>
                  {index === 0 || isSubscribed ? (
                    <video
                      ref={videoRef}
                      width="100%"
                      height="200"
                      controls
                      preload="auto"
                      controlsList="nodownload"
                      style={{ borderRadius: '4px' }}
                    >
                      <source src={video.path} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '200px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: '#f5f5f5',
                        borderRadius: '4px',
                        border: '2px dashed #cccccc',
                      }}
                    >
                      <LockIcon color="action" fontSize="large" />
                    </Box>
                  )}
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {index === 0 || isSubscribed
                      ? `Watch this amazing video about ${video.title}.`
                      : 'Subscribe to unlock this video and more!'}
                  </Typography>
                </CardContent>
                <CardActions>
                  {index === 0 || isSubscribed ? (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => handlePlayPause(videoRef)}
                        aria-label="play/pause"
                      >
                        <PlayCircleOutlineIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleMuteUnmute(videoRef)}
                        aria-label="mute/unmute"
                      >
                        <VolumeUpIcon />
                      </IconButton>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubscribe}
                      sx={{ ml: 'auto', fontWeight: 'bold' }}
                    >
                      Subscribe Now
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default VideoGallery;
