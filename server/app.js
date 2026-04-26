// ── Express App (shared between local dev & Cloud Functions) ──
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const { protect } = require('./middleware/authMiddleware');
const aiService = require('./services/aiService');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://votepath-ai-38a5e.web.app',
      'https://votepath-ai-38a5e.firebaseapp.com',
    ];
    // Allow Vercel deployments (*.vercel.app)
    if (!origin || allowed.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in dev, restrict in production if needed
    }
  },
  credentials: true,
}));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

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
app.use('/api/translate', protect, require('./routes/translateRoutes'));

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

module.exports = app;
