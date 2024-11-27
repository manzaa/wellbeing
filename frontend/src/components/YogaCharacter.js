// src/AnxietyReliefGames.js
import React, { useState, useEffect } from 'react';
import '../AnxietyReliefGames.css';

const AnxietyReliefGames = () => {
  const [activeGame, setActiveGame] = useState('breathe');
  const [breathing, setBreathing] = useState(true);
  const [color, setColor] = useState('#80deea');
  const [count, setCount] = useState(1);
  const [affirmation, setAffirmation] = useState('You are capable.');
  const [starCount, setStarCount] = useState(0);

  const affirmations = [
    "You are strong.",
    "You are capable.",
    "You are loved.",
    "Believe in yourself.",
    "Today is a new beginning.",
  ];

  useEffect(() => {
    let interval;
    if (activeGame === 'breathe') {
      interval = setInterval(() => setBreathing((prev) => !prev), 4000);
    } else if (activeGame === 'color') {
      const colors = ['#80deea', '#ffb6c1', '#ffd54f', '#a5d6a7', '#f8bbd0'];
      let index = 0;
      interval = setInterval(() => setColor(colors[(index = (index + 1) % colors.length)]), 3000);
    } else if (activeGame === 'count') {
      interval = setInterval(() => setCount((prev) => (prev < 10 ? prev + 1 : 1)), 2000);
    } else if (activeGame === 'affirmations') {
      interval = setInterval(
        () => setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]),
        2000
      );
    }
    return () => clearInterval(interval);
  }, [activeGame, affirmations]);

  return (
    <div className="app">
      <h1>Anxiety Relief Games</h1>
      <div className="buttons">
        <button onClick={() => setActiveGame('breathe')}>Breathe with Me</button>
        <button onClick={() => setActiveGame('color')}>Relaxing Color Change</button>
        <button onClick={() => setActiveGame('count')}>Calm Counting</button>
        <button onClick={() => setActiveGame('affirmations')}>Positive Affirmations</button>
        <button onClick={() => setActiveGame('stars')}>Counting Stars</button>
      </div>

      <div className="game-container">
        {activeGame === 'breathe' && (
          <div className="breathe-container">
            <div className={`circle ${breathing ? 'expand' : 'contract'}`}></div>
            <h2>{breathing ? 'Breathe in...' : 'Breathe out...'}</h2>
          </div>
        )}

        {activeGame === 'color' && (
          <div className="color-change-container" style={{ backgroundColor: color }}>
            <h2>Relax and watch the colors change...</h2>
          </div>
        )}

        {activeGame === 'count' && (
          <div className="counting-container">
            <h2>Count along slowly...</h2>
            <div className="count">{count}</div>
          </div>
        )}

        {activeGame === 'affirmations' && (
          <div className="affirmation-container">
            <h2>Positive Affirmations</h2>
            <p>{affirmation}</p>
          </div>
        )}

        {activeGame === 'stars' && (
          <div className="stars-container">
            <h2>Count the stars</h2>
            <p>Stars counted: {starCount}</p>
            <div className="star-field" onClick={() => setStarCount(starCount + 1)}>
              {[...Array(50)].map((_, i) => (
                <span key={i} className="star"></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnxietyReliefGames;
