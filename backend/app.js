// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const audioRoutes = require('./routes/audioRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const topicRoutes = require('./routes/topicRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
// app.use('/api', topicRoutes);
// app.use('/api/auth', authRoutes); // Authentication routes
// // app.use('/api/topics', authenticateToken, topicRoutes); // Topics routes (authenticated)
// app.use('/api/audio', authenticateToken, audioRoutes); // Audio routes (authenticated)

module.exports = app;