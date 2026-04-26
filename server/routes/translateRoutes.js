const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// POST /api/translate — Translate text to a target language
router.post('/', async (req, res) => {
  try {
    const { text, targetLanguage, targetLanguageCode } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ success: false, error: 'Text and target language are required.' });
    }

    if (text.length > 1000) {
      return res.status(400).json({ success: false, error: 'Text must be under 1000 characters.' });
    }

    const systemPrompt = `You are a professional translator specializing in Indian languages. 
Translate the given text accurately into ${targetLanguage}. 
Rules:
- Return ONLY the translated text, nothing else
- Do NOT add quotes, explanations, or notes
- Preserve the meaning, tone, and intent
- If the text contains election/voting terminology, use the correct official terms in ${targetLanguage}
- Keep proper nouns, abbreviations (EVM, VVPAT, ECI, NOTA) as-is`;

    const prompt = `Translate this text to ${targetLanguage}:\n\n${text}`;

    const result = await aiService.generate(prompt, systemPrompt, false);

    res.json({
      success: true,
      data: {
        originalText: text,
        translatedText: result.content.trim(),
        targetLanguage,
        targetLanguageCode,
        provider: result.provider,
      },
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ success: false, error: 'Translation failed. Please try again.' });
  }
});

module.exports = router;
