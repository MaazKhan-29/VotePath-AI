require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const { protect } = require('./middleware/authMiddleware');
const aiService = require('./services/aiService');

const app = express();
const PORT = parseInt(process.env.PORT) || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Public routes
app.use('/api/auth', require('./routes/authRoutes'));

// Protected routes (require JWT)
app.use('/api/user', protect, require('./routes/userRoutes'));
app.use('/api/journey', protect, require('./routes/journeyRoutes'));
app.use('/api/chat', protect, require('./routes/chatRoutes'));
app.use('/api/checklist', protect, require('./routes/checklistRoutes'));
app.use('/api/timeline', protect, require('./routes/timelineRoutes'));
app.use('/api/scenario', protect, require('./routes/scenarioRoutes'));
app.use('/api/quiz', protect, require('./routes/quizRoutes'));
app.use('/api/booth', protect, require('./routes/boothRoutes'));

// Health check endpoint (public)
app.get('/api/health', async (req, res) => {
  const aiStatus = await aiService.getStatus();
  res.json({
    success: true,
    status: 'running',
    ai: aiStatus,
    timestamp: new Date().toISOString(),
  });
});

// Error handler
app.use(errorHandler);

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`\n🚀 VotePath AI Server running on port ${port}`);
    console.log(`📡 Health check: http://localhost:${port}/api/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔐 Auth: JWT + Google OAuth enabled\n`);

    // Check AI availability on startup
    aiService.getStatus().then(status => {
      console.log('🤖 AI Status:');
      console.log(`   Gemini: ${status.gemini ? '🟢 Available' : '🔴 Unavailable'}`);
      console.log(`   Active Provider: ${status.activeProvider || 'None (using fallback)'}\n`);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${port} is busy, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('❌ Server error:', err);
      process.exit(1);
    }
  });
};

startServer(PORT);
