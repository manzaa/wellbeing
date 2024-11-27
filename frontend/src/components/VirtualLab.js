import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Grid, Select, MenuItem, Tooltip, Divider } from '@mui/material';
import { Home, Badge } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Comprehensive language data with vowels, letters, basic words, vocabulary, phrases, and grammar concepts
const languageData = {
    English: {
        vowels: ['A', 'E', 'I', 'O', 'U'],
        letters: [
            { symbol: 'A', sound: 'A' }, { symbol: 'B', sound: 'B' }, { symbol: 'C', sound: 'C' },
            // ... (Other letters here)
            { symbol: 'Z', sound: 'Z' }
        ],
        basicWords: ['Apple', 'Ball', 'Cat', 'Dog', 'Egg'],
        vocabulary: ['Adventure', 'Brave', 'Curious', 'Dream', 'Explore'],
        phrases: ['Hello!', 'How are you?', 'What is your name?', 'Nice to meet you!'],
        grammar: ['Nouns', 'Verbs', 'Adjectives', 'Conjunctions', 'Prepositions']
    },
    Kannada: {
        vowels: ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ'],
        letters: [
            { symbol: 'ಅ', sound: 'A' }, { symbol: 'ಆ', sound: 'AA' }, { symbol: 'ಇ', sound: 'I' },
            // ... (Other letters here)
            { symbol: 'ಜ್ಞ', sound: 'Gnya' }
        ],
        basicWords: ['ಅಕ್ಕಿ (Rice)', 'ಆನೆ (Elephant)', 'ಮನೆ (House)', 'ಮಗು (Child)', 'ಕಾಯಿ (Fruit)'],
        vocabulary: ['ಬಣ್ಣಗಳು (Colors)', 'ಫಲಗಳು (Fruits)', 'ಹಕ್ಕಿಗಳು (Birds)', 'ಪ್ರಾಣಿ (Animals)', 'ಭಕ್ಷ್ಯ (Food)'],
        phrases: ['ನಮಸ್ತೆ', 'ನಿಮ್ಮ ಹೆಸರು ಏನು?', 'ಹೊಸದು ಕಲಿಯಿರಿ', 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', 'ತುಂಬ ಧನ್ಯವಾದಗಳು'],
        grammar: ['ಸರ್ವನಾಮಗಳು (Pronouns)', 'ವಿಷಯ (Subject)', 'ಕ್ರೀಯಾಪದಗಳು (Verbs)', 'ಸಂಬಂಧಿಸು (Conjunction)', 'ವಿಷೇಶಣ (Adjective)']
    },
    Hindi: {
        vowels: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'],
        letters: [
            { symbol: 'अ', sound: 'A' }, { symbol: 'आ', sound: 'AA' }, { symbol: 'इ', sound: 'I' },
            // ... (Other letters here)
            { symbol: 'ह', sound: 'Ha' }
        ],
        basicWords: ['अमरूद (Guava)', 'आम (Mango)', 'इमली (Tamarind)', 'पानी (Water)', 'घर (House)'],
        vocabulary: ['रंग (Colors)', 'फल (Fruits)', 'पक्षी (Birds)', 'प्राणी (Animals)', 'भोजन (Food)'],
        phrases: ['नमस्ते', 'आपका नाम क्या है?', 'नया सीखें', 'आप कैसे हैं?', 'धन्यवाद'],
        grammar: ['सर्वनाम (Pronouns)', 'क्रिया (Verbs)', 'विशेषण (Adjectives)', 'समुच्चय बोधक (Conjunction)', 'प्रत्यय (Suffix)']
    }
};

// Speech synthesis function
const speak = (text, lang = 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
};

const LearningComponent = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const navigate = useNavigate();
    const [hasCompleted, setHasCompleted] = useState(false);

    const handleComplete = () => {
        setHasCompleted(true);
        sessionStorage.setItem('badge', 'Language Learning');
    };

    const getLanguageCode = () => {
        switch (selectedLanguage) {
            case 'English': return 'en-US';
            case 'Kannada': return 'kn-IN';
            case 'Hindi': return 'hi-IN';
            default: return 'en-US';
        }
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f0f4f8' }}>
            <Button startIcon={<Home />} onClick={() => navigate('/kidpowerhub')} sx={{ mb: 2 }}>Back to Hub</Button>
            <Typography variant="h4" color="primary" textAlign="center" gutterBottom>Learn {selectedLanguage}</Typography>

            <Select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} fullWidth sx={{ mb: 4 }}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Kannada">Kannada</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
            </Select>

            {Object.entries(languageData[selectedLanguage]).map(([category, items], index) => (
                <Box key={index} sx={{ mb: 4 }}>
                    <Typography variant="h5" color="secondary" gutterBottom>{category}</Typography>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {items.map((item, i) => (
                            <Grid item xs={6} sm={4} md={2} key={i}>
                                <Tooltip title={item.example || ''}>
                                    <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer' }} onClick={() => speak(item.symbol || item, getLanguageCode())}>
                                        <Typography variant="h6" align="center">{item.symbol || item}</Typography>
                                    </Paper>
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}

            {/* Badge and Completion */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                {hasCompleted ? (
                    <Box display="flex" alignItems="center" color="green">
                        <Badge color="success" />
                        <Typography variant="h6" sx={{ ml: 1 }}>You earned a badge!</Typography>
                    </Box>
                ) : (
                    <Button variant="contained" color="success" onClick={handleComplete}>
                        Complete and Earn Badge
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default LearningComponent;
