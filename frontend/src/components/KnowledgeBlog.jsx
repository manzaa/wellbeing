import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Box,
  CardMedia,
  Divider,
  Button,
  Chip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import knowledgeData from './knowledgeData.json';

const KnowledgeBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [colorMode, setColorMode] = useState('radiant'); // Default color mode
  const itemsPerPage = 6;
  const totalPages = Math.ceil(knowledgeData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentData = knowledgeData
    .sort((a, b) => b.id - a.id)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const shareOnFacebook = (item) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${item.title}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnWhatsApp = (item) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${item.title}\n\n${item.description}\n\nRead more: ${window.location.href}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  const getBackgroundColor = () => {
    switch (colorMode) {
      case 'dark':
        return '#121212';
      case 'light':
        return '#ffffff';
      case 'radiant':
      default:
        return 'linear-gradient(to bottom, #ff9a9e, #fad0c4, #fbc2eb)';
    }
  };

  const getTextColor = () => {
    return colorMode === 'dark' ? '#ffffff' : '#000000';
  };

  return (
    <Box
      sx={{
        background: getBackgroundColor(),
        color: getTextColor(),
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="bold">
            Kids Knowledge Hub
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={colorMode === 'dark'}
                onChange={() =>
                  setColorMode((prev) =>
                    prev === 'dark' ? 'radiant' : prev === 'radiant' ? 'light' : 'dark'
                  )
                }
              />
            }
            label={`Mode: ${colorMode.charAt(0).toUpperCase() + colorMode.slice(1)}`}
          />
        </Box>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Blog Items */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {currentData.map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                      },
                      bgcolor: colorMode === 'dark' ? '#1f1f1f' : '#ffffff',
                      color: getTextColor(),
                    }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardMedia
                      component="img"
                      height="400"
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          height: '60px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          color: getTextColor(),
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Chip
                        label="Read More"
                        color="primary"
                        sx={{ mt: 2, fontWeight: 'bold' }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" sx={{ mt: 6 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          </Grid>

          {/* Selected Item Details */}
          <Grid item xs={12} md={4}>
            {selectedItem ? (
              <Card
                sx={{
                  p: 2,
                  background: colorMode === 'dark' ? '#1f1f1f' : '#ffffff',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                  color: getTextColor(),
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={selectedItem.image}
                  alt={selectedItem.title}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                  >
                    {selectedItem.title}
                  </Typography>
                  <Divider sx={{ my: 2, bgcolor: getTextColor() }} />
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {selectedItem.details}
                  </Typography>

                  {/* Share Section */}
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      startIcon={<FacebookIcon />}
                      variant="contained"
                      color="primary"
                      onClick={() => shareOnFacebook(selectedItem)}
                    >
                      Facebook
                    </Button>
                    <Button
                      startIcon={<WhatsAppIcon />}
                      variant="contained"
                      color="success"
                      onClick={() => shareOnWhatsApp(selectedItem)}
                    >
                      WhatsApp
                    </Button>
                    <Button
                      startIcon={<ShareIcon />}
                      variant="outlined"
                      color="secondary"
                    >
                      Copy Link
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Typography
                variant="h6"
                textAlign="center"
                sx={{
                  p: 2,
                  border: '1px dashed #ccc',
                  borderRadius: '10px',
                  background: colorMode === 'dark' ? '#1f1f1f' : '#ffffff',
                  color: getTextColor(),
                }}
              >
                Select an item to view details.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default KnowledgeBlog;
