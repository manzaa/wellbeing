import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const TrademarkFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.default',
        color: 'text.secondary',
        py: 3,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>
        <Typography variant="caption" display="block" mt={1}>
          Trademark information or disclaimer can go here.
        </Typography>
      </Container>
    </Box>
  );
};

export default TrademarkFooter;
