const { Ollama } = require('ollama');

class OllamaService {
  constructor() {
    this.client = new Ollama({
      host: process.env.OLLAMA_HOST || 'http://localhost:11434',
    });
    this.model = process.env.OLLAMA_MODEL || 'llama3.1';
    this.timeout = parseInt(process.env.OLLAMA_TIMEOUT) || 30000;
  }

  async isAvailable() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${process.env.OLLAMA_HOST || 'http://localhost:11434'}/api/tags`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) return false;
      
      const data = await response.json();
      const hasModel = data.models?.some(m => m.name.includes('llama3.1'));
      return hasModel || data.models?.length > 0;
    } catch (error) {
      return false;
    }
  }

  async generate(prompt, systemPrompt = '') {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const messages = [];
      
      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }
      messages.push({ role: 'user', content: prompt });

      const response = await this.client.chat({
        model: this.model,
        messages,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          num_predict: 1024,
        },
      });

      clearTimeout(timeoutId);
      return {
        content: response.message.content,
        provider: 'ollama',
        model: this.model,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw new Error(`Ollama Error: ${error.message}`);
    }
  }
}

module.exports = new OllamaService();
