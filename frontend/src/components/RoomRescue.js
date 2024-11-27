import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomRescue = () => {
    const [tasks, setTasks] = useState([]);
    const [challenge, setChallenge] = useState(null);
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        const fetchChallengeData = async () => {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/challenges/roomrescue');
            console.log("roomresue", data);
            setChallenge(data.challenge);
            setTasks(data.tasks);
        };

        const fetchBadges = async () => {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/badges/roomrescue');
            setBadges(data);
        };

        fetchChallengeData();
        fetchBadges();
    }, []);

    return (
        <div>
            <h2>{challenge ? challenge.title : 'Loading...'}</h2>
            <p>{challenge ? challenge.description : ''}</p>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.name} - {task.is_completed ? 'Completed' : 'Pending'}</li>
                ))}
            </ul>
            <div>
                {badges.map((badge) => (
                    <div key={badge.id}>
                        <img src={badge.icon} alt={badge.name} />
                        <p>{badge.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomRescue;
