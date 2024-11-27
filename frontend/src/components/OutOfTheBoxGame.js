import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Chip,
  Grid,
  TextField,
  Slider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import data from './OutOftheBoxData.json';

const OutOfTheBoxGame = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [completedActivities, setCompletedActivities] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load completed activities from local storage
  useEffect(() => {
    const storedCompleted = JSON.parse(localStorage.getItem('completedActivities')) || [];
    setCompletedActivities(storedCompleted);
  }, []);

  // Save completed activities to local storage
  useEffect(() => {
    localStorage.setItem('completedActivities', JSON.stringify(completedActivities));
  }, [completedActivities]);

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedActivity(null);
  };

  const handleRandomActivity = () => {
    const random = data[Math.floor(Math.random() * data.length)];
    setSelectedActivity(random);
    setOpenDialog(true);
  };

  const handleCompleteActivity = (id) => {
    if (!completedActivities.includes(id)) {
      setCompletedActivities([...completedActivities, id]);
    }
    setOpenDialog(false);
  };

  const handleFilter = () => {
    let filtered = data;
    if (difficultyFilter) {
      filtered = filtered.filter((activity) => activity.difficulty === difficultyFilter);
    }
    if (tagFilter) {
      filtered = filtered.filter((activity) => activity.tags.includes(tagFilter));
    }
    setFilteredData(filtered);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, color: darkMode ? 'white' : 'black', bgcolor: darkMode ? 'black' : 'white' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Out-of-the-Box Thinking Game
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Complete challenges and unlock your creativity!
      </Typography>

      <Box display="flex" justifyContent="space-between" sx={{ mb: 4 }}>
        <TextField
          label="Filter by Tag"
          variant="outlined"
          size="small"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Slider
          aria-label="Difficulty"
          value={difficultyFilter === 'Easy' ? 1 : difficultyFilter === 'Medium' ? 2 : difficultyFilter === 'Hard' ? 3 : 0}
          onChange={(e, val) => {
            const diff = val === 1 ? 'Easy' : val === 2 ? 'Medium' : val === 3 ? 'Hard' : '';
            setDifficultyFilter(diff);
          }}
          marks={[
            { value: 1, label: 'Easy' },
            { value: 2, label: 'Medium' },
            { value: 3, label: 'Hard' }
          ]}
          step={1}
          min={0}
          max={3}
          sx={{ width: '50%' }}
        />
        <Button variant="contained" onClick={handleFilter}>
          Apply Filters
        </Button>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {filteredData.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
                border: completedActivities.includes(activity.id) ? '2px solid green' : 'none'
              }}
              onClick={() => handleSelectActivity(activity)}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {activity.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {activity.description}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={`Difficulty: ${activity.difficulty}`}
                    color="primary"
                    size="small"
                    icon={activity.difficulty === 'Hard' ? <StarIcon /> : null}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" size="large" onClick={handleRandomActivity}>
          Try a Random Challenge
        </Button>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
          label="Dark Mode"
          sx={{ ml: 3 }}
        />
      </Box>

      {selectedActivity && (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
          <DialogTitle>{selectedActivity.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedActivity.description}
            </Typography>
            <Typography variant="h6">Example</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {selectedActivity.example}
            </Typography>
            <Typography variant="h6">Activity</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {selectedActivity.activity}
            </Typography>
            <Box>
              {selectedActivity.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{ mr: 1, mt: 1 }}
                  color="secondary"
                  size="small"
                />
              ))}
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 4 }}>
              <Button variant="outlined" color="error" onClick={handleCloseDialog}>
                <ClearIcon /> Cancel
              </Button>
              <Button variant="contained" color="success" onClick={() => handleCompleteActivity(selectedActivity.id)}>
                <DoneIcon /> Mark Complete
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};

export default OutOfTheBoxGame;
