const { GoogleGenAI } = require('@google/genai');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    this.timeout = parseInt(process.env.GEMINI_TIMEOUT) || 15000;
    this.client = null;
  }

  _ensureClient() {
    if (!this.client && this.apiKey && this.apiKey !== 'your_gemini_api_key_here') {
      this.client = new GoogleGenAI({ apiKey: this.apiKey });
    }
    return !!this.client;
  }

  isAvailable() {
    return this._ensureClient();
  }

  async generate(prompt, systemPrompt = '') {
    if (!this._ensureClient()) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const fullPrompt = systemPrompt 
        ? `${systemPrompt}\n\nUser Query: ${prompt}` 
        : prompt;

      const response = await this.client.models.generateContent({
        model: this.model,
        contents: fullPrompt,
        config: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
      });

      return {
        content: response.text,
        provider: 'gemini',
        model: this.model,
      };
    } catch (error) {
      throw new Error(`Gemini Error: ${error.message}`);
    }
  }
}

module.exports = new GeminiService();
