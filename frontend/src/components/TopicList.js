import React, { useEffect, useState } from 'react';
import api from '../services/api';

function TopicList() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await api.get('/topics', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTopics(response.data);
        };
        fetchTopics();
    }, []);

    return (
        <div>
            <h2>Well-being Topics</h2>
            <ul>
                {topics.map((topic) => (
                    <li key={topic.id}>{topic.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default TopicList;