import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Grid, IconButton, Divider } from '@mui/material';
import { ArrowBack, ArrowForward, Print } from '@mui/icons-material';

// Define categories with phonics data
const phonicsCategories = {
    beginningSounds: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m"],
    consonantBlends: ["bl", "cl", "fl", "gl", "pl", "sl"],
    cvcWords: ["cat", "dog", "bat", "pig", "hat", "bag"],
    digraphs: ["ch", "sh", "th", "wh"],
    diphthongs: ["ai", "au", "oi", "ou"],
    endingSounds: ["-b", "-d", "-g", "-m", "-n", "-p"],
    longShortVowels: ["a", "e", "i", "o", "u"],
    phonemes: ["s", "a", "t", "i", "p", "n"]
};

// Main Worksheet Generator Component
const WorksheetGenerator = () => {
    const [worksheets, setWorksheets] = useState([]);
    const [currentWorksheet, setCurrentWorksheet] = useState(0);

    useEffect(() => {
        generateWorksheets();
    }, []);

    // Generate 100 worksheets with 10 rows each
    const generateWorksheets = () => {
        const generatedWorksheets = [];
        const types = Object.keys(phonicsCategories);

        for (let i = 0; i < 100; i++) {
            let worksheet = [];
            let usedTypes = [];

            // Fill each worksheet with 10 rows
            for (let j = 0; j < 10; j++) {
                // Randomize the category type, ensuring we avoid repetition in each worksheet
                let type;
                do {
                    type = types[Math.floor(Math.random() * types.length)];
                } while (usedTypes.includes(type) && usedTypes.length < types.length);

                const items = phonicsCategories[type];
                const item = items[Math.floor(Math.random() * items.length)];
                const question = generateQuestion(item, type);
                worksheet.push({ question, item, type });

                // Track the types used in this worksheet to avoid repetition
                usedTypes.push(type);
            }

            generatedWorksheets.push(worksheet);
        }
        setWorksheets(generatedWorksheets);
    };

    // Generate question text based on category type
    const generateQuestion = (item, type) => {
        switch (type) {
            case "beginningSounds":
                return `Circle the picture that starts with the "${item}" sound.`;
            case "consonantBlends":
                return `Identify the blend in the word with "${item}".`;
            case "cvcWords":
                return `Write the word that matches the image for "${item}".`;
            case "digraphs":
                return `Which word starts with the "${item}" sound?`;
            case "diphthongs":
                return `Find the words with the "${item}" sound.`;
            case "endingSounds":
                return `Circle the picture that ends with the "${item}" sound.`;
            case "longShortVowels":
                return `Identify the long/short vowel sound in "${item}".`;
            case "phonemes":
                return `What is the sound of the phoneme "${item}"?`;
            default:
                return "";
        }
    };

    const handleNext = () => {
        setCurrentWorksheet((prev) => (prev + 1) % worksheets.length);
    };

    const handlePrevious = () => {
        setCurrentWorksheet((prev) => (prev - 1 + worksheets.length) % worksheets.length);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f3f4f6' }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 2 }}>
                Kids Phonics Worksheets
            </Typography>
            
            {worksheets.length > 0 && (
                <Paper elevation={6} sx={{ padding: 4, marginTop: 3, backgroundColor: '#ffffff' }}>
                    <Typography variant="h5" gutterBottom align="center" sx={{ color: '#2e7d32' }}>
                        Worksheet {currentWorksheet + 1}
                    </Typography>
                    <Grid container spacing={3} sx={{ paddingBottom: 2 }}>
                        {worksheets[currentWorksheet].map((row, index) => (
                            <Grid item xs={12} key={index}>
                                <Divider />
                                <Box display="flex" alignItems="center" sx={{ paddingY: 2 }}>
                                    <Typography variant="h6" sx={{ flex: 1, fontWeight: 500 }}>
                                        {row.question}
                                    </Typography>
                                    <img
                                        src={`/images/phonics/${row.item}.jpg`}
                                        alt={row.item}
                                        style={{ width: '80px', height: 'auto', marginLeft: '15px' }}
                                    />
                                </Box>
                                <Divider />
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                        <IconButton onClick={handlePrevious} color="primary">
                            <ArrowBack />
                        </IconButton>
                        <IconButton onClick={handlePrint} color="secondary">
                            <Print />
                        </IconButton>
                        <IconButton onClick={handleNext} color="primary">
                            <ArrowForward />
                        </IconButton>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default WorksheetGenerator;
