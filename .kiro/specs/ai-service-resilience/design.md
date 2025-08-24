# Design Document

## Overview

This design implements a robust AI service layer with automatic failover, retry mechanisms, and graceful degradation to handle free model unavailability and rate limiting. The solution provides multiple fallback strategies and comprehensive error handling to ensure users can continue using the chemistry app even when AI services are experiencing issues.

## Architecture

The resilience system consists of four main layers:

1. **Retry Manager** - Handles exponential backoff and retry logic
2. **Model Fallback System** - Manages automatic switching between available models
3. **Graceful Degradation Layer** - Provides static content when AI fails
4. **Health Monitoring** - Tracks service health and recovery

## Components and Interfaces

### 1. Retry Manager (`server/retry-manager.ts`)

**Core Retry Logic:**

```typescript
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: string[];
}

class RetryManager {
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    config: RetryConfig
  ): Promise<T>;

  private calculateDelay(attempt: number, baseDelay: number): number;
  private isRetryableError(error: Error): boolean;
}
```

### 2. Model Fallback System (`server/model-fallback.ts`)

**Fallback Chain Management:**

```typescript
interface ModelFallbackChain {
  primary: string[];
  secondary: string[];
  emergency: string[];
}

class ModelFallbackManager {
  async tryModelsInSequence(
    request: AIRequest,
    chain: ModelFallbackChain
  ): Promise<AIResponse>;

  private async testModelAvailability(model: string): Promise<boolean>;
  private getNextAvailableModel(currentModel: string): string | null;
}
```

### 3. Enhanced OpenRouter Service (`server/openrouter-resilient.ts`)

**Resilient Request Handler:**

```typescript
class ResilientOpenRouterService extends OpenRouterService {
  private retryManager: RetryManager;
  private fallbackManager: ModelFallbackManager;
  private healthMonitor: HealthMonitor;

  async makeResilientRequest(
    messages: any[],
    options: RequestOptions
  ): Promise<string>;

  private async handleServiceFailure(error: Error): Promise<string>;
  private async getFallbackContent(requestType: string): Promise<string>;
}
```

### 4. Health Monitoring (`server/health-monitor.ts`)

**Service Health Tracking:**

```typescript
interface ServiceHealth {
  modelName: string;
  isAvailable: boolean;
  lastSuccess: Date;
  lastFailure: Date;
  successRate: number;
  averageResponseTime: number;
}

class HealthMonitor {
  trackRequest(model: string, success: boolean, responseTime: number): void;
  getModelHealth(model: string): ServiceHealth;
  getRecommendedModel(): string;
}
```

## Data Models

### Retry Configuration Schema

```typescript
interface RetryConfig {
  maxRetries: number; // Maximum retry attempts
  baseDelay: number; // Initial delay in ms
  maxDelay: number; // Maximum delay cap
  backoffMultiplier: number; // Exponential backoff multiplier
  retryableErrors: string[]; // Error types that should trigger retry
}
```

### Fallback Content Schema

```typescript
interface FallbackContent {
  reactionAnalysis: {
    [elementCombination: string]: ReactionAnalysis;
  };
  elementExplanations: {
    [elementSymbol: string]: string;
  };
  commonResponses: {
    [category: string]: string[];
  };
}
```

### Health Metrics Schema

```typescript
interface HealthMetrics {
  timestamp: Date;
  model: string;
  requestType: string;
  success: boolean;
  responseTime: number;
  errorType?: string;
  fallbackUsed?: boolean;
}
```

## Error Handling

### Error Classification System

- **Retryable Errors**: Rate limits (429), server errors (5xx), timeouts
- **Non-Retryable Errors**: Authentication (401), bad requests (400)
- **Fallback Triggers**: All AI service failures after retry exhaustion

### User-Friendly Error Messages

```typescript
const ERROR_MESSAGES = {
  HIGH_DEMAND:
    "The AI service is experiencing high demand. Trying alternative models...",
  RATE_LIMITED:
    "Free model usage limit reached. Please wait a moment and try again.",
  SERVICE_DOWN:
    "AI services are temporarily unavailable. Showing cached information.",
  FALLBACK_ACTIVE: "Using offline chemistry data while AI services recover.",
};
```

### Graceful Degradation Strategies

1. **Chemical Reaction Analysis Fallback:**

   - Use pre-computed common reactions database
   - Provide basic compound information from elements data
   - Show educational content about reaction types

2. **Element Explanation Fallback:**

   - Use periodic table data for basic properties
   - Provide pre-written educational content for common elements
   - Show element classification and group information

3. **Chat Assistant Fallback:**
   - Suggest common chemistry topics
   - Provide links to educational resources
   - Show pre-written answers to frequently asked questions

## Testing Strategy

### Unit Tests

1. **Retry Manager Tests:**

   - Test exponential backoff calculation
   - Test retry limit enforcement
   - Test error classification logic

2. **Fallback Manager Tests:**

   - Test model switching logic
   - Test fallback chain execution
   - Test health-based model selection

3. **Health Monitor Tests:**
   - Test metrics collection and calculation
   - Test model recommendation logic
   - Test health status reporting

### Integration Tests

1. **End-to-End Resilience Tests:**

   - Simulate AI service failures
   - Test complete fallback workflows
   - Verify user experience during outages

2. **Performance Tests:**
   - Test retry overhead impact
   - Test fallback response times
   - Test concurrent request handling

### Manual Testing

1. **Failure Simulation:**

   - Test with invalid API keys
   - Test with network disconnection
   - Test with rate limit simulation

2. **User Experience Testing:**
   - Verify error message clarity
   - Test automatic recovery behavior
   - Validate fallback content quality
