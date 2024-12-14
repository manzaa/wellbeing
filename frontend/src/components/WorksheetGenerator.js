import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Select, MenuItem, CircularProgress, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Badge } from '@mui/icons-material';

const WORKSHEET_COUNT = 20;
const WORKSHEET_SIZE = 20;

const WorksheetGenerator = () => {
    const [alphabets, setAlphabets] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [worksheetType, setWorksheetType] = useState('');
    const [currentWorksheetIndex, setCurrentWorksheetIndex] = useState(0);
    const [generatedWorksheets, setGeneratedWorksheets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const alphabetResponse = await fetch(process.env.REACT_APP_API_URL + '/api/alphabets');
            const alphabetsData = await alphabetResponse.json();
            const numberResponse = await fetch(process.env.REACT_APP_API_URL + '/api/numbers');
            const numbersData = await numberResponse.json();

            setAlphabets(alphabetsData);
            setNumbers(numbersData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateWorksheets = (type) => {
        let worksheets = [];

        if (type === 'phonics') {
            worksheets = Array.from({ length: WORKSHEET_COUNT }, () =>
                Array.from({ length: WORKSHEET_SIZE }, () => {
                    const randomIndex = Math.floor(Math.random() * alphabets.length);
                    const letter = alphabets[randomIndex].letter;
                    const type = Math.random() > 0.5 ? 'matching' : 'fill-in-the-blank';
                    const question = type === 'matching' 
                        ? `Match the letter "${letter}" with the object.` 
                        : `Fill in the missing letter: "${letter}___"`;
                    return { letter, question };
                })
            );
        } else if (type === 'math-shapes-patterns') {
            worksheets = Array.from({ length: WORKSHEET_COUNT }, () =>
                Array.from({ length: WORKSHEET_SIZE }, (_, index) => {
                    if (index % 3 === 0) {
                        const pattern = ['Circle', 'Square', 'Triangle'][Math.floor(Math.random() * 3)];
                        return `Continue the pattern: ${pattern}, ___, ${pattern}, ___`;
                    } else if (index % 3 === 1) {
                        const shapes = ['Triangle', 'Square', 'Circle'];
                        return `Count the ${shapes[Math.floor(Math.random() * shapes.length)]} shapes.`;
                    } else {
                        const shape = ['Triangle', 'Square', 'Rectangle'][Math.floor(Math.random() * 3)];
                        return `How many sides does a ${shape} have?`;
                    }
                })
            );
        } else if (type === 'addition' || type === 'subtraction' || type === 'multiplication') {
            worksheets = Array.from({ length: WORKSHEET_COUNT }, () =>
                Array.from({ length: WORKSHEET_SIZE }, () => {
                    const num1 = Math.floor(Math.random() * 10) + 1;
                    const num2 = Math.floor(Math.random() * 10) + 1;
                    const question =
                        type === 'addition'
                            ? `${num1} + ${num2} = ?`
                            : type === 'subtraction'
                            ? `${num1} - ${num2} = ?`
                            : `${num1} x ${num2} = ?`;
                    return question;
                })
            );
        }

        setGeneratedWorksheets(worksheets);
        setCurrentWorksheetIndex(0);
    };

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setWorksheetType(selectedType);
        generateWorksheets(selectedType);
    };

    const handleNextWorksheet = () => {
        setCurrentWorksheetIndex((prev) => (prev + 1) % WORKSHEET_COUNT);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Box sx={{ padding: 4 }}>
                        <Button startIcon={<Home />} onClick={() => navigate('/premium')} sx={{ mb: 2 }}>Back to Hub</Button>

            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Kids Printable Worksheets
            </Typography>
            <Select
                value={worksheetType}
                onChange={handleTypeChange}
                displayEmpty
                sx={{ mb: 3, width: '100%' }}
            >
                <MenuItem value="" disabled>Select Worksheet Type</MenuItem>
                {/* <MenuItem value="phonics">Phonics with Matching & Fill-In Exercises</MenuItem> */}
                {/* <MenuItem value="math-shapes-patterns">Math: Shapes and Patterns</MenuItem> */}
                <MenuItem value="addition">Addition</MenuItem>
                <MenuItem value="subtraction">Subtraction</MenuItem>
                <MenuItem value="multiplication">Multiplication</MenuItem>
            </Select>
            
            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={{ marginTop: 4, padding: 2 }}>
                    {generatedWorksheets.length > 0 && (
                        <Paper elevation={4} sx={{ padding: 3, marginBottom: 4 }}>
                            <Typography variant="h5" gutterBottom>
                                Worksheet {currentWorksheetIndex + 1}
                            </Typography>
                            <Grid container spacing={2} sx={{ padding: 2 }}>
                                {generatedWorksheets[currentWorksheetIndex].map((item, index) => (
                                    <Grid item xs={6} sm={3} key={index}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                backgroundColor: '#e3f2fd',
                                                padding: '10px',
                                                borderRadius: '8px',
                                                textAlign: 'center',
                                                fontSize: '1.2em',
                                            }}
                                        >
                                            {typeof item === 'string' ? item : item.question}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    )}
                </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <Button onClick={handleNextWorksheet} variant="contained" color="primary" sx={{ paddingX: 4 }}>
                    Next Worksheet
                </Button>
                <Button onClick={handlePrint} variant="outlined" color="secondary" sx={{ paddingX: 4 }}>
                    Print Worksheet
                </Button>
            </Box>
        </Box>
    );
};

export default WorksheetGenerator;
