// ── Express App (shared between local dev & Cloud Functions) ──
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const { protect } = require('./middleware/authMiddleware');
const { generalLimiter, authLimiter, aiLimiter } = require('./middleware/rateLimiter');
const aiService = require('./services/aiService');

const app = express();

// Connect to MongoDB
connectDB();

// ── Security Middleware ─────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false, // Allow inline scripts for React
}));
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(generalLimiter); // Global rate limiting

// ── Core Middleware ─────────────────────────────────────────
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
app.use(express.json({ limit: '1mb' })); // Limit payload size
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ── Public routes (with auth rate limiter) ──────────────────
app.use('/api/auth', authLimiter, require('./routes/authRoutes'));

// ── Protected routes (require JWT + AI rate limiter) ────────
app.use('/api/user', protect, require('./routes/userRoutes'));
app.use('/api/journey', protect, aiLimiter, require('./routes/journeyRoutes'));
app.use('/api/chat', protect, aiLimiter, require('./routes/chatRoutes'));
app.use('/api/checklist', protect, require('./routes/checklistRoutes'));
app.use('/api/timeline', protect, aiLimiter, require('./routes/timelineRoutes'));
app.use('/api/scenario', protect, aiLimiter, require('./routes/scenarioRoutes'));
app.use('/api/quiz', protect, require('./routes/quizRoutes'));
app.use('/api/booth', protect, aiLimiter, require('./routes/boothRoutes'));
app.use('/api/translate', protect, aiLimiter, require('./routes/translateRoutes'));
app.use('/api/analytics', protect, require('./routes/analyticsRoutes'));

// Health check endpoint (public)
app.get('/api/health', async (req, res) => {
  const aiStatus = await aiService.getStatus();
  res.json({
    success: true,
    status: 'running',
    ai: aiStatus,
    security: {
      helmet: true,
      rateLimiting: true,
      mongoSanitize: true,
      jwtAuth: true,
    },
    timestamp: new Date().toISOString(),
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
