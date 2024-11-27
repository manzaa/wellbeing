import React, { useEffect, useState } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const LikeButton = ({ userId, topicId, subtopicId, onLikeChange, showLikedSubtopics }) => {
    const [isLiked, setIsLiked] = useState(false);

    console.log("selectedTopic", topicId, showLikedSubtopics, subtopicId);
    useEffect(() => {
        const fetchLikedStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}/topics/${topicId}/liked`);
                const likedSubtopics = response.data;
                console.log("fetch liked status");
                console.log(subtopicId, response);
                const liked = likedSubtopics.some(item => item.subtopic_id === subtopicId);
                setIsLiked(liked);
            } catch (error) {
                console.error('Error fetching liked status:', error);
            }
        };

        fetchLikedStatus();
    }, [userId, subtopicId]);

    const handleLike = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/api/topics/${topicId}/subtopics/${subtopicId}/like`;
            if (isLiked) {
                await axios.post(url, { userId });
            } else {
                await axios.post(url, { userId });
            }

            setIsLiked(!isLiked);
            onLikeChange(topicId);
        } catch (error) {
            console.error('Error toggling like status:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleLike}>
                {isLiked || showLikedSubtopics ? <StarIcon sx={{ color: '#ff9800' }} /> : <StarBorderIcon sx={{ color: '#ff9800' }} />}
            </IconButton>
            <Typography variant="body2">{isLiked  ? 'Liked' : 'Like'}</Typography>
        </Box>
    );
};

export default LikeButton;
