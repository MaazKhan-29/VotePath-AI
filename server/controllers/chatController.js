const User = require('../models/User');
const ChatHistory = require('../models/ChatHistory');
const aiService = require('../services/aiService');
const prompts = require('../services/promptService');
const analyticsService = require('../services/analyticsService');
const { asyncHandler } = require('../middleware/errorHandler');

// POST /api/chat
const chat = asyncHandler(async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ success: false, error: 'userId and message are required.' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  // Get or create chat history
  let chatHistory = await ChatHistory.findOne({ userId });
  if (!chatHistory) {
    chatHistory = await ChatHistory.create({ userId, messages: [] });
  }

  // Add user message
  chatHistory.messages.push({ role: 'user', content: message });

  // Generate AI response with timing (don't cache chat messages)
  const startTime = Date.now();
  const { system, prompt } = prompts.chat(message, user, chatHistory.messages);
  const result = await aiService.generate(prompt, system, false);
  const responseTimeMs = Date.now() - startTime;

  // Add assistant response
  chatHistory.messages.push({ role: 'assistant', content: result.content });

  // Keep only last 50 messages
  if (chatHistory.messages.length > 50) {
    chatHistory.messages = chatHistory.messages.slice(-50);
  }

  await chatHistory.save();

  // Log interaction for analytics (non-blocking)
  analyticsService.logQuery({
    userId, query: message, response: result.content,
    provider: result.provider, endpoint: 'chat',
    responseTimeMs, cached: result.cached || false,
  });

  res.json({
    success: true,
    data: {
      reply: result.content,
      provider: result.provider,
    },
  });
});

// GET /api/chat/:userId/history
const getChatHistory = asyncHandler(async (req, res) => {
  const chatHistory = await ChatHistory.findOne({ userId: req.params.userId });
  
  res.json({
    success: true,
    data: chatHistory ? chatHistory.messages : [],
  });
});

module.exports = { chat, getChatHistory };
