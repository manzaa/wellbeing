import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    IconButton,
    List,
    ListItem,
    Toolbar,
    Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';
import LikeButton from './likeButton';
import AudioRecorder from './AudioRecorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StopIcon from '@mui/icons-material/Stop';

const Dashboard = () => {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [subtopics, setSubtopics] = useState([]);
    const [likedSubtopics, setLikedSubtopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subtopicsLoading, setSubtopicsLoading] = useState(false);
    const [showLikedSubtopics, setShowLikedSubtopics] = useState(false);
    const [audioList, setAudioList] = useState([]);
    const [isPlaying, setIsPlaying] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState(null);
    const audioRefs = useRef({});
    const userId = sessionStorage.getItem('userId');
    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    };

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL + '/api/topics', getAuthHeaders());
                setTopics(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching topics:', error);
                setLoading(false);
            }
        };
        fetchTopics();
    }, []);

    const fetchAudioList = async (topic_id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/audio?userId=${userId}&topicId=${topic_id}`
            );
            setAudioList(response.data.data);
        } catch (error) {
            console.error('Error fetching audio list:', error);
        }
    };

    const handleTopicChange = async (event) => {
        stopCurrentAudio();  // Stop audio when changing topic
        if (speechSynthesisInstance) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setSpeechSynthesisInstance(null);
        }
        const topic = event.target.value;
        setSelectedTopic(topic);
        setSubtopicsLoading(true);
        setShowLikedSubtopics(false);

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/topics/${topic}/subtopics`);
            setSubtopics(response.data.data);
            setSubtopicsLoading(false);
            fetchLikedSubtopics(topic);
        } catch (error) {
            console.error('Error fetching subtopics:', error);
            setSubtopicsLoading(false);
        }

        fetchAudioList(topic);
    };

    const fetchLikedSubtopics = async (selectedTopic) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}/topics/${selectedTopic}/liked`);
            setLikedSubtopics(response.data);
        } catch (error) {
            console.error('Error fetching liked subtopics:', error);
        }
    };

    const toggleLikedSubtopicsView = () => {
        setShowLikedSubtopics((prev) => !prev);
    };

    const handlePlay = (url) => {
        stopCurrentAudio();  // Stop any currently playing audio before starting a new one
    
        const audio = new Audio(url);
        audio.play().catch(error => console.error("Error playing audio:", error));
        setIsPlaying(url);
        audioRefs.current[url] = audio;
    
        audio.onended = () => setIsPlaying(null);
    };

    // Stop any currently playing audio
    const stopCurrentAudio = () => {
        if (isPlaying && audioRefs.current[isPlaying]) {
            audioRefs.current[isPlaying].pause();
            audioRefs.current[isPlaying].currentTime = 0;
            setIsPlaying(null);
        }
    };

    // useEffect(() => {
    //     return () => stopCurrentAudio(); // Cleanup on unmount
    // }, []);


    useEffect(() => {
        return () => {
            if (speechSynthesisInstance) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                setSpeechSynthesisInstance(null);
            }
            if (isPlaying) {
                stopCurrentAudio();
            }
        };
    }, [speechSynthesisInstance, isPlaying]);


    
    const subtopicsToDisplay = showLikedSubtopics ? likedSubtopics : subtopics;
    return (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Toolbar />
            {/* Existing Content */}
            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <FormControl sx={{ minWidth: 240 }}>
                        <InputLabel>Topics</InputLabel>
                        <Select
                            value={selectedTopic}
                            onChange={handleTopicChange}
                            label="Topics"
                        >
                            {topics.map((topic) => (
                                <MenuItem key={topic.id} value={topic.id}>
                                    {topic.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
    
                    <IconButton onClick={toggleLikedSubtopicsView} sx={{ ml: 2 }}>
                        {showLikedSubtopics ? (
                            <StarIcon sx={{ color: '#ff9800' }} />
                        ) : (
                            <StarBorderIcon sx={{ color: '#ff9800' }} />
                        )}
                    </IconButton>
                </Box>
            )}
    
            {subtopicsLoading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3} sx={{ maxWidth: 900, mt: 2 }}>
                    {subtopicsToDisplay.map((subtopic) => (
                        <Grid item xs={12} sm={6} md={6} key={subtopic.id}>
                            <Accordion
                                sx={{
                                    backgroundColor: '#f0f4f8',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    '&:before': { display: 'none' },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: '#1976d2' }} />}
                                    sx={{
                                        backgroundColor: '#1976d2',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <Typography>{subtopic.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
                                  {/* Play/Stop Icon with Guidance */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent accordion toggle on click
                                                if (isSpeaking) {
                                                    window.speechSynthesis.cancel();
                                                    setIsSpeaking(false);
                                                    setSpeechSynthesisInstance(null);
                                                } else {
                                                    const utterance = new SpeechSynthesisUtterance(subtopic.description);
                                                    utterance.lang = 'en-US';
                                                    window.speechSynthesis.speak(utterance);
                                                    setIsSpeaking(true);
                                                    setSpeechSynthesisInstance(utterance);
                                                    utterance.onend = () => setIsSpeaking(false);
                                                }
                                            }}
                                            color="inherit"
                                            sx={{ mr: 2 }} // Margin to separate icon from the text
                                        >
                                            {isSpeaking ? <StopIcon /> : <PlayArrowIcon />}
                                        </IconButton>
                                        <Typography variant="body2" sx={{ color: '#ffccbc', fontSize: '0.8rem' }}>
                                            Tap to Play/Stop Description
                                        </Typography>
                                    </Box>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            {subtopic.description}
                                        </Typography>


                                    <LikeButton
                                        userId={userId}
                                        topicId={selectedTopic}
                                        subtopicId={subtopic.id}
                                        onLikeChange={fetchLikedSubtopics}
                                        showLikedSubtopics={showLikedSubtopics}
                                    />
                                    <AudioRecorder
                                        userId={userId}
                                        topicId={selectedTopic}
                                        subtopicId={subtopic.id}
                                    />

                                    {/* Display Recorded Audios */}
                                    <List sx={{ ml: 4 }}>
                                        {audioList.length > 0 &&
                                            audioList
                                                .filter((audio) => audio.subtopic_id === subtopic.id)
                                                .map((audio, index) => (
                                                    <ListItem
                                                        key={index}
                                                        sx={{ display: 'flex', alignItems: 'center' }}
                                                    >
                                                        <IconButton
                                                            onClick={() => handlePlay(audio.audio_url)}
                                                            color="primary"
                                                        >
                                                            <PlayArrowIcon />
                                                        </IconButton>
                                                        <Typography>
                                                            {audio.name || `Recording ${index + 1}`}
                                                        </Typography>
                                                    </ListItem>
                                                ))}
                                    </List>
                                </AccordionDetails>

                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
            )}
            {/* Overall Well-Being Statistics Section */}
            <Box sx={{ maxWidth: 900, mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom color="primary">
                    Overall Well-Being Statistics
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Explore insights into physical, mental, emotional, and social well-being to better understand how they impact daily life.
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {[
                        {
                            title: "Physical Well-Being",
                            description:
                                "Approximately 18.5% of children aged 2-19 are considered obese. Only 25% of kids meet the recommended 60 minutes of daily physical activity.",
                            color: "#f44336",
                        },
                        {
                            title: "Mental Well-Being",
                            description:
                                "Around 20% of adolescents globally experience mental health issues annually. Only 25% of teens get the recommended 8–10 hours of sleep.",
                            color: "#3f51b5",
                        },
                        {
                            title: "Social Well-Being",
                            description:
                                "Kids with strong friendships are 25% more likely to report high happiness levels. Post-pandemic, 40% of teens report feeling socially disconnected.",
                            color: "#4caf50",
                        },
                        {
                            title: "Emotional Well-Being",
                            description:
                                "Schools implementing mindfulness programs see a 28% improvement in emotional resilience among students.",
                            color: "#ff9800",
                        },
                        {
                            title: "Environmental Well-Being",
                            description:
                                "About 75% of kids understand recycling but only 30% actively participate at home.",
                            color: "#009688",
                        },
                        {
                            title: "Creative and Cognitive Well-Being",
                            description:
                                "Kids involved in gamified learning environments are 50% more likely to retain knowledge.",
                            color: "#9c27b0",
                        },
                        {
                            title: "Family and Community Well-Being",
                            description:
                                "Kids spending 5+ hours weekly with family are twice as likely to report positive well-being.",
                            color: "#795548",
                        },
                    ].map((stat, index) => (
                        <Box
                            key={index}
                            sx={{
                                mb: 2,
                                p: 2,
                                borderRadius: '10px',
                                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                                backgroundColor: stat.color,
                                color: '#fff',
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                {stat.title}
                            </Typography>
                            <Typography variant="body2">{stat.description}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
    
};

export default Dashboard;
