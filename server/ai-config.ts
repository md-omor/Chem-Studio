// AI Model Configuration
// Change these settings to switch between different models and providers

export const AI_CONFIG = {
  // Current provider: 'openrouter' or 'gemini'
  provider: "openrouter" as "openrouter" | "gemini",

  // OpenRouter model selection
  // Using FREE Llama 3.1 405B - No charges!
  openrouter: {
    // LLAMA MODELS
    LLAMA_405B_FREE: "meta-llama/llama-3.1-405b-instruct:free", // FREE VERSION - No charges!
    LLAMA_70B_FREE: "meta-llama/llama-3.1-70b-instruct:free", // Best free option
    LLAMA_8B_FREE: "meta-llama/llama-3.1-8b-instruct:free", // Good free option

    // OTHER MODELS (for reference)
    MISTRAL_FREE: "mistralai/mistral-7b-instruct:free", // Alternative free
    CLAUDE_HAIKU: "anthropic/claude-3.5-haiku", // $0.25/M tokens - Excellent
    GPT4O_MINI: "openai/gpt-4o-mini", // $0.15/M tokens - Good
    CLAUDE_SONNET: "anthropic/claude-3.5-sonnet", // $3.00/M tokens - Best
    GPT4O: "openai/gpt-4o", // $2.50/M tokens - Great

    // Current selection - Anthropic Claude 3.5 Haiku
    current: "anthropic/claude-3.5-haiku", // Anthropic Claude 3.5 Haiku
  },

  // Model-specific settings
  settings: {
    temperature: 0.7,
    maxTokens: 2000,

    // Different temperatures for different tasks
    reactionAnalysis: { temperature: 0.4, maxTokens: 1500 }, // Anthropic Claude: more precise
    elementExplanation: { temperature: 0.4, maxTokens: 1500 }, // Anthropic Claude: more precise
    chatAssistant: { temperature: 0.4, maxTokens: 1500 }, // Anthropic Claude: more precise
  },
};

// Helper function to get current model
export function getCurrentModel() {
  return AI_CONFIG.openrouter.current;
}

// Helper function to switch models easily
export function switchModel(modelKey: keyof typeof AI_CONFIG.openrouter) {
  if (modelKey !== "current") {
    AI_CONFIG.openrouter.current = AI_CONFIG.openrouter[modelKey];
    console.log(`Switched to model: ${AI_CONFIG.openrouter.current}`);
  }
}

// Cost estimation (approximate per million tokens)
export const MODEL_COSTS = {
  // FREE MODELS (No cost)
  "meta-llama/llama-3.1-405b-instruct:free": 0, // FREE VERSION
  "meta-llama/llama-3.1-70b-instruct:free": 0,
  "meta-llama/llama-3.1-8b-instruct:free": 0,
  "mistralai/mistral-7b-instruct:free": 0,

  // PAID MODELS (Will charge your account)
  "meta-llama/llama-3.1-405b-instruct": 2.7, // PAID VERSION - AVOID
  "anthropic/claude-3.5-haiku": 0.25,
  "openai/gpt-4o-mini": 0.15,
  "anthropic/claude-3.5-sonnet": 3.0,
  "openai/gpt-4o": 2.5,
};

export function getModelCost(model: string): number {
  return MODEL_COSTS[model as keyof typeof MODEL_COSTS] || 0;
}
