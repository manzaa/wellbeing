import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button, Typography, Paper, TextField, Box, Alert } from '@mui/material';

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [userSolution, setUserSolution] = useState(null);
  const [isSolved, setIsSolved] = useState(false);

  const fetchSudoku = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sudoku');
      const { puzzle, solution } = response.data;
      setPuzzle(puzzle);
      setSolution(solution);
      setUserSolution(puzzle.map((cell) => (cell === null ? '' : cell))); // Initialize userSolution with empty strings for editable cells
      setIsSolved(false);
    } catch (error) {
      console.error("Error fetching Sudoku puzzle:", error);
    }
  };

  useEffect(() => {
    fetchSudoku();
  }, []);

  const handleChange = (index, value) => {
    if (/^[1-9]?$/.test(value)) {
      const updatedSolution = [...userSolution];
      updatedSolution[index] = value === '' ? '' : parseInt(value);
      setUserSolution(updatedSolution);
    }
  };

  const checkSolution = () => {
    const isCorrect = userSolution.every(
      (cell, index) => cell === solution[index]
    );
    setIsSolved(isCorrect);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Sudoku Puzzle
      </Typography>
      <Button variant="contained" color="primary" onClick={fetchSudoku} style={{ marginBottom: '20px' }}>
        Generate New Puzzle
      </Button>
      {puzzle && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(9, 1fr)"
          gap={1}
          style={{ maxWidth: '450px', margin: '0 auto', border: '2px solid black', padding: '10px', backgroundColor: '#f0f0f0' }}
        >
          {userSolution.map((cell, index) => (
            <Paper
              key={index}
              elevation={3}
              style={{
                backgroundColor: puzzle[index] === null ? '#fff' : '#e0e0e0',
                textAlign: 'center',
                padding: '10px',
                border: '1px solid #ddd',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)',
                borderTop: (index % 9 === 3 || index % 9 === 6) ? '2px solid black' : '1px solid #ddd',
                borderLeft: (Math.floor(index / 9) % 3 === 1 && index % 9 === 0) ? '2px solid black' : '1px solid #ddd',
              }}
            >
              {puzzle[index] === null ? (
                <TextField
                  variant="outlined"
                  size="small"
                  inputProps={{
                    style: { textAlign: 'center', padding: 0 },
                    maxLength: 1,
                  }}
                  value={cell || ''}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              ) : (
                <Typography variant="h6" align="center">
                  {cell}
                </Typography>
              )}
            </Paper>
          ))}
        </Box>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={checkSolution}
        style={{ marginTop: '20px' }}
      >
        Check Solution
      </Button>
      {isSolved && (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          🎉 Congratulations! You solved the puzzle! 🎉
        </Alert>
      )}
    </div>
  );
};

export default Sudoku;
