# Design Document

## Overview

This design addresses the OpenRouter API charging issue by implementing proper free model configuration and cost protection mechanisms. The solution ensures that only free models are used by default and provides safeguards against accidental paid usage.

## Architecture

The fix involves three main components:

1. **AI Configuration Module** - Updated model definitions and validation
2. **OpenRouter Service** - Enhanced initialization with cost protection
3. **Model Validation System** - Runtime checks for free model usage

## Components and Interfaces

### 1. AI Configuration Updates (`server/ai-config.ts`)

**Free Model Definitions:**

- Separate free and paid model categories
- Clear naming conventions with `:free` suffix validation
- Default configuration pointing to free models only

**Model Validation Functions:**

```typescript
interface ModelInfo {
  name: string;
  isFree: boolean;
  cost: number;
  provider: string;
}

function validateFreeModel(modelName: string): boolean;
function getFreeModelAlternative(modelName: string): string | null;
function getModelInfo(modelName: string): ModelInfo;
```

### 2. OpenRouter Service Enhancements (`server/openrouter.ts`)

**Initialization Validation:**

- Check current model is free during service initialization
- Log warnings for paid models and auto-switch to free alternatives
- Refuse to initialize if no free alternative exists

**Request-Level Protection:**

- Validate model is free before making API requests
- Include cost estimation in request logging
- Provide clear error messages for paid model attempts

### 3. Model Management System

**Configuration Structure:**

```typescript
export const AI_CONFIG = {
  provider: "openrouter",
  openrouter: {
    freeModels: {
      LLAMA_405B_FREE: "meta-llama/llama-3.1-405b-instruct:free",
      LLAMA_70B_FREE: "meta-llama/llama-3.1-70b-instruct:free",
      LLAMA_8B_FREE: "meta-llama/llama-3.1-8b-instruct:free",
      MISTRAL_FREE: "mistralai/mistral-7b-instruct:free",
    },
    paidModels: {
      // Clearly separated paid options
    },
    current: "meta-llama/llama-3.1-405b-instruct:free", // Default to free
  },
};
```

## Data Models

### Model Configuration Schema

```typescript
interface AIConfig {
  provider: "openrouter" | "gemini";
  openrouter: {
    freeModels: Record<string, string>;
    paidModels: Record<string, string>;
    current: string;
  };
  settings: ModelSettings;
}

interface ModelSettings {
  temperature: number;
  maxTokens: number;
  reactionAnalysis: RequestSettings;
  elementExplanation: RequestSettings;
  chatAssistant: RequestSettings;
}
```

### Cost Protection Schema

```typescript
interface CostProtection {
  enableFreeOnly: boolean;
  warnOnPaidModel: boolean;
  blockPaidRequests: boolean;
  logCostEstimates: boolean;
}
```

## Error Handling

### Model Validation Errors

- **Invalid Model Error**: When model doesn't exist or is malformed
- **Paid Model Error**: When attempting to use paid model with protection enabled
- **No Free Alternative Error**: When no free version of requested model exists

### API Request Errors

- Enhanced error messages for billing-related issues (402 errors)
- Clear distinction between rate limits and billing problems
- Automatic fallback to free models when possible

### Logging Strategy

- Startup validation logs with model cost information
- Request-level logging with cost estimates
- Warning logs for any paid model detection
- Error logs for configuration issues

## Testing Strategy

### Unit Tests

1. **Model Validation Tests**

   - Test free model detection logic
   - Test paid model blocking functionality
   - Test free alternative lookup

2. **Configuration Tests**

   - Test AI config initialization with free models
   - Test model switching with validation
   - Test cost calculation accuracy

3. **Service Initialization Tests**
   - Test OpenRouter service startup with free models
   - Test error handling for invalid configurations
   - Test automatic fallback mechanisms

### Integration Tests

1. **API Request Tests**

   - Test actual API calls with free models
   - Test cost protection during requests
   - Test error handling for billing issues

2. **End-to-End Tests**
   - Test complete chemistry analysis workflow with free models
   - Test assistant chat functionality with cost protection
   - Test element explanation with validated models

### Manual Testing

1. **Configuration Verification**

   - Verify startup logs show free model usage
   - Verify no unexpected charges after extended usage
   - Verify error messages are clear and actionable

2. **Model Switching Tests**
   - Test switching between different free models
   - Test prevention of switching to paid models
   - Test cost estimation accuracy

## Implementation Notes

### Backward Compatibility

- Maintain existing API interfaces
- Preserve current functionality while adding protection
- Ensure existing tests continue to pass

### Performance Considerations

- Model validation should be fast (cached lookups)
- Minimal overhead for request-level checks
- Efficient logging without impacting response times

### Security Considerations

- API key protection remains unchanged
- No exposure of cost information to client-side
- Secure handling of model configuration changes
