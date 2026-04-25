const ollamaService = require('./ollamaService');
const geminiService = require('./geminiService');
const cacheService = require('./cacheService');

class AIService {
  constructor() {
    this.currentProvider = null;
    this.ollamaAvailable = false;
    this.geminiAvailable = false;
    this.lastHealthCheck = 0;
    this.healthCheckInterval = 30000; // 30 seconds
  }

  async checkHealth() {
    const now = Date.now();
    if (now - this.lastHealthCheck < this.healthCheckInterval) {
      return {
        ollama: this.ollamaAvailable,
        gemini: this.geminiAvailable,
        activeProvider: this.currentProvider,
      };
    }

    this.ollamaAvailable = await ollamaService.isAvailable();
    this.geminiAvailable = geminiService.isAvailable();
    this.lastHealthCheck = now;

    if (this.ollamaAvailable) {
      this.currentProvider = 'ollama';
    } else if (this.geminiAvailable) {
      this.currentProvider = 'gemini';
    } else {
      this.currentProvider = null;
    }

    return {
      ollama: this.ollamaAvailable,
      gemini: this.geminiAvailable,
      activeProvider: this.currentProvider,
    };
  }

  async generate(prompt, systemPrompt = '', useCache = true) {
    // Step 1: Check cache
    if (useCache) {
      const hash = cacheService.generateHash(prompt, systemPrompt);
      const cached = await cacheService.get(hash);
      if (cached) {
        console.log('📦 Cache hit for prompt');
        return {
          content: cached.response,
          provider: 'cache',
          originalProvider: cached.provider,
          cached: true,
        };
      }
    }

    // Step 2: Try Ollama first
    try {
      const health = await this.checkHealth();
      
      if (health.ollama) {
        console.log('🦙 Using Ollama (Llama 3.1)...');
        const result = await ollamaService.generate(prompt, systemPrompt);
        
        // Cache successful response
        if (useCache) {
          const hash = cacheService.generateHash(prompt, systemPrompt);
          await cacheService.set(hash, result.content, 'ollama');
        }
        
        return { ...result, cached: false };
      }
    } catch (error) {
      console.warn('⚠️ Ollama failed:', error.message);
      this.ollamaAvailable = false;
    }

    // Step 3: Fallback to Gemini
    try {
      if (geminiService.isAvailable()) {
        console.log('☁️ Falling back to Gemini...');
        const result = await geminiService.generate(prompt, systemPrompt);
        
        // Cache successful response
        if (useCache) {
          const hash = cacheService.generateHash(prompt, systemPrompt);
          await cacheService.set(hash, result.content, 'gemini');
        }
        
        return { ...result, cached: false };
      }
    } catch (error) {
      console.error('❌ Gemini also failed:', error.message);
    }

    // Step 4: Both failed — return fallback message
    return {
      content: this._getFallbackResponse(prompt),
      provider: 'fallback',
      cached: false,
      error: 'Both AI providers are unavailable. Showing pre-built guidance.',
    };
  }

  _getFallbackResponse(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('register') || lowerPrompt.includes('voter id')) {
      return `## How to Register as a Voter in India

**Step 1:** Visit the National Voters' Service Portal at https://voters.eci.gov.in/

**Step 2:** Click on "New Voter Registration" and fill Form 6.

**Step 3:** Upload required documents:
- Passport-sized photograph
- Proof of Age (Birth certificate, 10th marksheet, or Aadhaar)
- Proof of Address (Aadhaar, Passport, or utility bill)

**Step 4:** Submit the form and note your reference number.

**Step 5:** Track your application status using the reference number.

**What should you do next?** Visit https://voters.eci.gov.in/ and start your registration today!`;
    }

    if (lowerPrompt.includes('booth') || lowerPrompt.includes('polling')) {
      return `## How to Find Your Polling Booth

**Step 1:** Visit https://electoralsearch.eci.gov.in/

**Step 2:** Search using your EPIC (Voter ID) number OR your personal details.

**Step 3:** Your polling station name and address will be displayed.

**Step 4:** On voting day, carry:
- Voter ID Card (EPIC)
- Any additional photo ID (Aadhaar, PAN, Driving License)

**What should you do next?** Search for your polling station today so you know where to go!`;
    }

    return `## Your Voting Journey Guide

India's democracy is strengthened by every vote. Here's what you need to know:

**Step 1:** Check if you're registered at https://voters.eci.gov.in/

**Step 2:** If not registered, apply using Form 6 online.

**Step 3:** Gather your documents (Aadhaar, age proof, address proof).

**Step 4:** Find your polling booth at https://electoralsearch.eci.gov.in/

**Step 5:** On election day, visit your booth with your Voter ID.

**What should you do next?** Start by checking your voter registration status!`;
  }

  async getStatus() {
    return this.checkHealth();
  }
}

module.exports = new AIService();
