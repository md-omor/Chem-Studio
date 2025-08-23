# OpenRouter Setup Guide for ChemVerse

## 🚀 Quick Setup

### 1. Get Your OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for a free account
3. Go to [Keys](https://openrouter.ai/keys) section
4. Create a new API key
5. Copy your API key

### 2. Update Environment Variables

Replace `your_openrouter_api_key_here` in your `.env` file with your actual API key:

```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

### 3. Model Recommendations by Budget

#### 🆓 **FREE Models (Start Here!)**

- **Llama 3.1 70B** (Current default) - Excellent for chemistry, completely free
- **Llama 3.1 8B** - Good for basic tasks, completely free
- **Mistral 7B** - Alternative free option

#### 💰 **Budget Models ($0.15-$0.25 per million tokens)**

- **Claude 3.5 Haiku** - Best performance/price ratio
- **GPT-4o Mini** - Good structured responses

#### 🏆 **Premium Models ($2.50-$3.00 per million tokens)**

- **Claude 3.5 Sonnet** - Best overall performance
- **GPT-4o** - Excellent alternative

## 🔧 How to Switch Models

### Option 1: Edit Configuration File

Open `server/ai-config.ts` and change the `current` model:

```typescript
openrouter: {
  // Change this line to switch models:
  current: "anthropic/claude-3.5-haiku"; // Switch to budget model
}
```

### Option 2: Available Models

```typescript
// Free models
"meta-llama/llama-3.1-70b-instruct:free"; // Best free (default)
"meta-llama/llama-3.1-8b-instruct:free"; // Good free
"mistralai/mistral-7b-instruct:free"; // Alternative free

// Budget models
"anthropic/claude-3.5-haiku"; // $0.25/M - Excellent
"openai/gpt-4o-mini"; // $0.15/M - Good

// Premium models
"anthropic/claude-3.5-sonnet"; // $3.00/M - Best
"openai/gpt-4o"; // $2.50/M - Great
```

## 📊 Performance Comparison

| Model                | Cost  | Chemistry Accuracy | Speed      | JSON Reliability |
| -------------------- | ----- | ------------------ | ---------- | ---------------- |
| Llama 3.1 70B (Free) | $0.00 | ⭐⭐⭐⭐           | ⭐⭐⭐     | ⭐⭐⭐⭐         |
| Claude 3.5 Haiku     | $0.25 | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐       |
| GPT-4o Mini          | $0.15 | ⭐⭐⭐⭐           | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐       |
| Claude 3.5 Sonnet    | $3.00 | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐       |

## 🎯 Recommended Progression

1. **Start**: Llama 3.1 70B (Free) - Test your app functionality
2. **Upgrade**: Claude 3.5 Haiku ($0.25) - When you need better accuracy
3. **Premium**: Claude 3.5 Sonnet ($3.00) - For production or complex chemistry

## 💡 Cost Estimation

For a chemistry education app with moderate usage:

- **Free models**: $0/month (perfect for development and testing)
- **Budget models**: $5-20/month (great for small user base)
- **Premium models**: $50-200/month (for high-traffic production)

## 🔄 Switching Back to Gemini

If you want to switch back to Gemini, simply change in `server/routes.ts`:

```typescript
// Change this line:
import {
  analyzeChemicalReaction,
  explainElement,
  assistantChat,
} from "./openrouter";

// Back to:
import {
  analyzeChemicalReaction,
  explainElement,
  assistantChat,
} from "./gemini";
```

## 🚨 Troubleshooting

### API Key Issues

- Make sure your API key starts with `sk-or-v1-`
- Check that you have credits in your OpenRouter account
- Verify the key is correctly set in `.env` file

### Model Not Working

- Try switching to a different model in `ai-config.ts`
- Check OpenRouter status page for model availability
- Some models may have usage limits

### Rate Limits

- Free models have rate limits
- Upgrade to paid models for higher limits
- Implement request queuing if needed

## 📈 Monitoring Usage

1. Check your usage at [OpenRouter Dashboard](https://openrouter.ai/activity)
2. Set up billing alerts to avoid surprises
3. Monitor which features use the most tokens

## 🎉 You're Ready!

Your ChemVerse app is now powered by OpenRouter! Start with the free Llama 3.1 70B model and upgrade as needed.
