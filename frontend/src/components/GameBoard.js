// src/components/GameBoard.js

import React, { useState, useEffect, useRef } from 'react';
import Tile from './Tile';
import { motion } from 'framer-motion';
import Sound from 'react-sound';
import Confetti from 'react-confetti';

const themes = ["Calm", "Focus", "Gratitude", "Energy", "Patience"];
const gridSize = 5;
const maxLevel = 5;

const wellBeingPrompts = [
  "Take a deep breath and relax.",
  "Think of three things you're grateful for.",
  "Remember to stay present in the moment.",
  "Reflect on a positive memory from today.",
  "Focus on your breathing for a few seconds."
];

const specialTileTypes = {
  STRIPED: "striped",
  BOMB: "bomb",
  COLOR_BOMB: "color_bomb",
};

const GameBoard = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [specialTiles, setSpecialTiles] = useState({});
  const [level, setLevel] = useState(1);
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [playMatchSound, setPlayMatchSound] = useState(false);
  const [playLevelUpSound, setPlayLevelUpSound] = useState(false);
  const [playPromptSound, setPlayPromptSound] = useState(false);
  const [showMatchEffect, setShowMatchEffect] = useState(false);
  const [showLevelUpEffect, setShowLevelUpEffect] = useState(false);
  const [hintUses, setHintUses] = useState(3);

  const gameBoardRef = useRef(null);

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    const cascadeMatches = () => {
      const hasMatches = checkForMatches();
      if (!hasMatches && !findPossibleMoves(grid).length) {
        reshuffleBoard();
      }
    };

    const cascadeInterval = setInterval(cascadeMatches, 500);
    return () => clearInterval(cascadeInterval);
  }, [grid]);

  const initializeGrid = () => {
    let newGrid = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      newGrid.push(themes[Math.floor(Math.random() * themes.length)]);
    }
    setGrid(newGrid);
  };

  const handleTileClick = (index) => {
    const potentialMatch = findPotentialMatch(index);
    if (potentialMatch !== null) {
      swapTiles(index, potentialMatch);
      checkForMatches();
    }
  };

  const findPotentialMatch = (index) => {
    const neighbors = getNeighbors(index);
    for (const neighbor of neighbors) {
      const newGrid = [...grid];
      [newGrid[index], newGrid[neighbor]] = [newGrid[neighbor], newGrid[index]];
      if (findMatches(newGrid).length > 0) {
        return neighbor;
      }
    }
    return null;
  };

  const swapTiles = (index1, index2) => {
    const newGrid = [...grid];
    [newGrid[index1], newGrid[index2]] = [newGrid[index2], newGrid[index1]];
    setGrid(newGrid);
  };

  const checkForMatches = () => {
    const matches = findMatches(grid);
    if (matches.length > 0) {
      handleMatches(matches);
      return true;
    }
    return false;
  };

  const findMatches = (newGrid) => {
    let matches = [];
    let specialTilesToCreate = [];

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize - 2; j++) {
        const index = i * gridSize + j;
        if (newGrid[index] && newGrid[index] === newGrid[index + 1] && newGrid[index] === newGrid[index + 2]) {
          matches.push(index, index + 1, index + 2);

          // Create a special tile if match is longer than three
          if (j < gridSize - 3 && newGrid[index] === newGrid[index + 3]) {
            matches.push(index + 3);
            specialTilesToCreate.push({ index: index + 2, type: specialTileTypes.STRIPED });
          }
          if (j < gridSize - 4 && newGrid[index] === newGrid[index + 4]) {
            matches.push(index + 4);
            specialTilesToCreate.push({ index: index + 2, type: specialTileTypes.BOMB });
          }
        }
      }
    }

    if (specialTilesToCreate.length) {
      const updatedSpecialTiles = { ...specialTiles };
      specialTilesToCreate.forEach(tile => {
        updatedSpecialTiles[tile.index] = tile.type;
      });
      setSpecialTiles(updatedSpecialTiles);
    }

    return [...new Set(matches)];
  };

  const handleMatches = (matches) => {
    const newGrid = [...grid];
    matches.forEach((index) => {
      if (specialTiles[index]) {
        activateSpecialTile(index, specialTiles[index], newGrid);
      }
      newGrid[index] = null;
    });
    setGrid(newGrid);
    setScore((prevScore) => prevScore + matches.length * 10);
    setPlayMatchSound(true);
    setShowMatchEffect(true);
    setTimeout(() => setShowMatchEffect(false), 500);
    dropTiles(newGrid);

    if ((score + matches.length * 10) % 100 === 0 && level < maxLevel) {
      setLevel((prevLevel) => prevLevel + 1);
      setPlayLevelUpSound(true);
      setShowLevelUpEffect(true);
      setTimeout(() => setShowLevelUpEffect(false), 1500);
      showWellBeingPrompt();
    }
  };

  const activateSpecialTile = (index, type, newGrid) => {
    if (type === specialTileTypes.STRIPED) {
      clearRowOrColumn(index, newGrid);
    } else if (type === specialTileTypes.BOMB) {
      clearSurroundingTiles(index, newGrid);
    } else if (type === specialTileTypes.COLOR_BOMB) {
      clearAllTilesOfColor(newGrid[index], newGrid);
    }
  };

  const clearRowOrColumn = (index, newGrid) => {
    const row = Math.floor(index / gridSize);
    for (let col = 0; col < gridSize; col++) {
      newGrid[row * gridSize + col] = null;
    }
  };

  const clearSurroundingTiles = (index, newGrid) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const neighbors = getNeighbors(index, row, col);
    neighbors.forEach((neighbor) => {
      newGrid[neighbor] = null;
    });
  };

  // New function: clear all tiles of a specific color
  const clearAllTilesOfColor = (color, newGrid) => {
    newGrid.forEach((tile, index) => {
      if (tile === color) {
        newGrid[index] = null;
      }
    });
  };

  // New function: finds possible moves by simulating swaps
  const findPossibleMoves = (currentGrid) => {
    const possibleMoves = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      const neighbors = getNeighbors(i);
      for (const neighbor of neighbors) {
        const tempGrid = [...currentGrid];
        [tempGrid[i], tempGrid[neighbor]] = [tempGrid[neighbor], tempGrid[i]];
        if (findMatches(tempGrid).length > 0) {
          possibleMoves.push([i, neighbor]);
        }
      }
    }
    return possibleMoves;
  };

  // New function: reshuffles the board if no moves are possible
  const reshuffleBoard = () => {
    let newGrid = [...grid];
    do {
      newGrid = newGrid.sort(() => Math.random() - 0.5);
    } while (!findPossibleMoves(newGrid).length);
    setGrid(newGrid);
  };

  // src/components/GameBoard.js

// ... other imports and code ...

const getNeighbors = (index) => {
    const neighbors = [];
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
  
    // Define directions for adjacent tiles (up, down, left, right)
    const directions = [
      [-1, 0], // Up
      [1, 0],  // Down
      [0, -1], // Left
      [0, 1],  // Right
    ];
  
    directions.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
  
      // Calculate the neighbor index if it's within bounds
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
        neighbors.push(newRow * gridSize + newCol);
      }
    });
  
    return neighbors;
  };
  
  // Add this function above or alongside other functions, like `findPossibleMoves` and `clearSurroundingTiles`.
  
  
  const dropTiles = (newGrid) => {
    for (let j = 0; j < gridSize; j++) {
      let emptySpaces = 0;
      for (let i = gridSize - 1; i >= 0; i--) {
        const index = i * gridSize + j;
        if (newGrid[index] === null) {
          emptySpaces++;
        } else if (emptySpaces > 0) {
          newGrid[index + emptySpaces * gridSize] = newGrid[index];
          newGrid[index] = null;
        }
      }
    }

    const filledGrid = newGrid.map((tile) =>
      tile === null ? themes[Math.floor(Math.random() * themes.length)] : tile
    );

    setTimeout(() => setGrid(filledGrid), 300);
  };

  const showWellBeingPrompt = () => {
    const prompt = wellBeingPrompts[Math.floor(Math.random() * themes.length)];
    setCurrentPrompt(prompt);
    setShowPrompt(true);
    setPlayPromptSound(true);
  };

  const closePrompt = () => {
    setShowPrompt(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <h2>Score: {score} | Level: {level}/{maxLevel}</h2>

      {/* Sound Effects */}
      {playMatchSound && (
        <Sound
          url="/audios/match.wav"
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={() => setPlayMatchSound(false)}
          volume={70}
        />
      )}
      {playLevelUpSound && (
        <Sound
          url="/audios/level-up.wav"
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={() => setPlayLevelUpSound(false)}
          volume={70}
        />
      )}
      {playPromptSound && (
        <Sound
          url="/audios/prompt.wav"
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={() => setPlayPromptSound(false)}
          volume={50}
        />
      )}

      <motion.div
        ref={gameBoardRef}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 60px)`,
          gap: '8px',
          justifyContent: 'center',
          marginTop: '20px',
          position: 'relative',
          zIndex: 1,
        }}
        layout
      >
        {grid.map((theme, index) => (
          <Tile
            key={index}
            theme={theme || ''}
            onClick={() => handleTileClick(index)}
            isSpecial={specialTiles[index] || null}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default GameBoard;
