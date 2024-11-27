import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  TextField,
  IconButton
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const StoryBook = () => {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [editingPageIndex, setEditingPageIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('/stories.json')
      .then(response => response.json())
      .then(data => setStories(data))
      .catch(error => console.error('Error loading stories:', error));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleEditClick = (index) => {
    setEditingPageIndex(index);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setEditingPageIndex(null);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    const updatedStories = [...stories];
    updatedStories[currentStoryIndex].pages[currentPageIndex][field] = value;
    setStories(updatedStories);
  };

  const handleNextPage = () => {
    if (currentPageIndex < stories[currentStoryIndex].pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setCurrentPageIndex(0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setCurrentPageIndex(stories[currentStoryIndex - 1].pages.length - 1);
    }
  };

  if (stories.length === 0) {
    return <Typography>Loading stories...</Typography>;
  }

  const currentStory = stories[currentStoryIndex];
  const currentPage = currentStory.pages[currentPageIndex];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h3" gutterBottom>
          {currentStory.storyTitle}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          startIcon={<PrintIcon />}
          sx={{ mb: 3 }}
        >
          Print Story
        </Button>
      </Box>

      <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" color="primary" gutterBottom>
            {currentPage.title}
          </Typography>
          <IconButton
            color="secondary"
            onClick={() =>
              isEditing && editingPageIndex === currentPageIndex
                ? handleSaveClick()
                : handleEditClick(currentPageIndex)
            }
          >
            {isEditing && editingPageIndex === currentPageIndex ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Box>
        <CardMedia
          component="img"
          height="450"
          image={currentPage.image}
          alt={currentPage.title}
          sx={{ borderRadius: 2, mb: 2 }}
        />
        <CardContent>
          <Typography variant="body1" paragraph>
            {currentPage.text}
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" color="primary">
            Parent Prompt:
          </Typography>
          {isEditing && editingPageIndex === currentPageIndex ? (
            <TextField
              fullWidth
              variant="outlined"
              value={currentPage.parentPrompt}
              onChange={(e) => handleChange('parentPrompt', e.target.value)}
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              {currentPage.parentPrompt}
            </Typography>
          )}

          <Typography variant="h6" color="secondary" sx={{ mt: 2 }}>
            Improv Prompt:
          </Typography>
          {isEditing && editingPageIndex === currentPageIndex ? (
            <TextField
              fullWidth
              variant="outlined"
              value={currentPage.improvPrompt}
              onChange={(e) => handleChange('improvPrompt', e.target.value)}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              {currentPage.improvPrompt}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentStoryIndex === 0 && currentPageIndex === 0}
        >
          Previous Page
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentStoryIndex === stories.length - 1 && currentPageIndex === currentStory.pages.length - 1}
        >
          Next Page
        </Button>
      </Box>

      <style>
        {`
          /* Print Styles */
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              font-family: Arial, sans-serif;
            }
            .printable-page {
              page-break-inside: avoid;
              margin-bottom: 1rem;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            button, .MuiIconButton-root {
              display: none;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default StoryBook;
