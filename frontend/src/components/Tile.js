// src/components/Tile.js

import React from 'react';
import { motion } from 'framer-motion';

const themeColors = {
  Calm: { background: 'linear-gradient(145deg, #a8e6cf, #84d4b0)', text: '#084c61' },
  Focus: { background: 'linear-gradient(145deg, #ffb6b9, #ff8589)', text: '#501e1e' },
  Gratitude: { background: 'linear-gradient(145deg, #f9d976, #f39c12)', text: '#5d4037' },
  Energy: { background: 'linear-gradient(145deg, #a1c4fd, #c2e9fb)', text: '#1a3d7b' },
  Patience: { background: 'linear-gradient(145deg, #d4a5a5, #fbc2eb)', text: '#512b58' },
};

const Tile = ({ theme, onClick, isHint, isBreaking }) => {
  const colors = themeColors[theme] || { background: '#ddd', text: '#333' };

  return (
    <motion.div
      onClick={onClick}
      initial={{ scale: 1 }}
      animate={isBreaking ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: isBreaking ? 0.3 : 0.2 }}
      className={isHint ? 'blink' : ''}
      style={{
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.background,
        color: colors.text,
        fontWeight: 'bold',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '0.8em',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        border: '2px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      {theme}
    </motion.div>
  );
};

export default Tile;
