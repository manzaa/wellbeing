import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Pagination,
} from "@mui/material";
import quizzes from "./wellbeing_quizzes.json"; // Load the refined JSON file

const colorPalette = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFE0B2"]; // Color options

const WellbeingQuizzes = () => {
  const [selectedType, setSelectedType] = useState("Physical");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const itemsPerPage = 10;

  // Function to shuffle questions randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Filter quizzes dynamically and shuffle for randomness
  useEffect(() => {
    const filtered = quizzes.filter((quiz) => quiz.type === selectedType);
    setFilteredQuizzes(shuffleArray(filtered));
    setCurrentPage(1);
  }, [selectedType]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleAnswerSelect = (quizId, selectedOption) => {
    setAnswers({ ...answers, [quizId]: selectedOption });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuizzes = filteredQuizzes.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Wellbeing Quizzes
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Test your knowledge on physical, mental, social, and emotional wellbeing.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Select Wellbeing Type</InputLabel>
          <Select value={selectedType} onChange={handleTypeChange}>
            <MenuItem value="Physical">Physical</MenuItem>
            <MenuItem value="Mental">Mental</MenuItem>
            <MenuItem value="Social">Social</MenuItem>
            <MenuItem value="Emotional">Emotional</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {currentQuizzes.map((quiz) => (
          <Grid item xs={12} key={quiz.id}>
            <Card
              sx={{
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {quiz.question}
                </Typography>
                <RadioGroup
                  value={answers[quiz.id] || ""}
                  onChange={(e) => handleAnswerSelect(quiz.id, e.target.value)}
                >
                  {quiz.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{
                        backgroundColor: colorPalette[index % colorPalette.length],
                        borderRadius: 1,
                        padding: 1,
                        marginBottom: 1,
                        transition: "background-color 0.3s",
                        "&:hover": {
                          backgroundColor: `${colorPalette[index % colorPalette.length]}B3`, // Add transparency for hover effect
                        },
                      }}
                    />
                  ))}
                </RadioGroup>
                {answers[quiz.id] && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: answers[quiz.id] === quiz.answer ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {answers[quiz.id] === quiz.answer
                      ? "Correct! " + quiz.answer
                      : `Incorrect. The correct answer is: ${quiz.answer}`}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default WellbeingQuizzes;
