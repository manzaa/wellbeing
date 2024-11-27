import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import FavoriteIcon from '@mui/icons-material/Favorite';

const healthTips = {
  dos: [
    { 
      title: "Eat a Rainbow", 
      description: "Try to eat colorful fruits and vegetables like carrots, berries, and spinach every day.", 
      fact: "Each color has different vitamins that help parts of your body. For example, orange foods like carrots are good for your eyes!",
      icon: <EmojiNatureIcon /> 
    },
    { 
      title: "Stay Hydrated", 
      description: "Drink 6-8 glasses of water each day. Your body is made of around 60% water, so staying hydrated helps you feel energetic and focused!",
      fact: "Kids who drink water regularly perform better in school and sports.",
      icon: <FavoriteIcon /> 
    },
    { 
      title: "Get Moving", 
      description: "Play outside, dance, or play a sport. Try to get at least 60 minutes of activity each day.",
      fact: "Physical activity strengthens your heart, which is one of the most important muscles in your body.",
      icon: <EmojiNatureIcon /> 
    },
    { 
      title: "Sleep Well", 
      description: "Aim for 9-11 hours of sleep each night to recharge your body and mind.",
      fact: "Kids who get enough sleep can pay attention better in class and have more energy for play.",
      icon: <FavoriteIcon /> 
    },
    { 
      title: "Wash Your Hands", 
      description: "Wash with soap and water for at least 20 seconds, especially before meals and after using the bathroom.",
      fact: "Washing your hands can reduce your chance of getting a cold by about 20%.",
      icon: <EmojiNatureIcon /> 
    }
  ],
  donts: [
    { 
      title: "Don’t Skip Breakfast", 
      description: "Eating breakfast helps you start the day with energy and focus.",
      fact: "Kids who eat breakfast are more likely to do better in school and have more energy for play.",
      icon: <HighlightOffIcon /> 
    },
    { 
      title: "Limit Sugary Snacks and Drinks", 
      description: "Save sweets like candy and soda for special treats.",
      fact: "Too much sugar can lead to a 'sugar crash,' which makes you feel tired and cranky.",
      icon: <HighlightOffIcon /> 
    },
    { 
      title: "Don’t Stay Indoors All Day", 
      description: "Spend time outside to get fresh air, sunlight, and exercise.",
      fact: "Sunlight helps your body make vitamin D, which is important for bone health and mood.",
      icon: <HighlightOffIcon /> 
    },
    { 
      title: "Avoid Too Much Screen Time", 
      description: "Balance screen time with other fun activities like reading, drawing, or playing outside.",
      fact: "Kids should aim for less than 2 hours of recreational screen time daily to avoid eye strain and improve sleep quality.",
      icon: <HighlightOffIcon /> 
    }
  ]
};

const HealthTips = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" align="center" color="primary" gutterBottom>
        Dos and Don’ts for Kids’ Health
      </Typography>
      <Grid container spacing={3}>
        
        {/* Dos Section */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" color="success.main" gutterBottom>
                Dos
              </Typography>
              <List>
                {healthTips.dos.map((tip, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "success.main" }}>
                        {tip.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={tip.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {tip.description}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.secondary" display="block" sx={{ mt: 1 }}>
                            <strong>Fun Fact:</strong> {tip.fact}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Don’ts Section */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" color="error.main" gutterBottom>
                Don’ts
              </Typography>
              <List>
                {healthTips.donts.map((tip, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "error.main" }}>
                        {tip.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={tip.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {tip.description}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.secondary" display="block" sx={{ mt: 1 }}>
                            <strong>Did You Know:</strong> {tip.fact}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HealthTips;
