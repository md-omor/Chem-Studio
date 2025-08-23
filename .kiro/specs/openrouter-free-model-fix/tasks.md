# Implementation Plan

- [x] 1. Update AI configuration with proper free model structure

  - Restructure AI_CONFIG to clearly separate free and paid models
  - Set default model to the free version of Llama 3.1 405B
  - Add model validation helper functions
  - _Requirements: 1.1, 2.1, 2.2_

- [x] 2. Implement model validation and cost protection functions

  - Create validateFreeModel function to check if model has :free suffix
  - Create getFreeModelAlternative function to find free versions of paid models
  - Create getModelInfo function to return model details including cost
  - Add MODEL_COSTS mapping with accurate free model costs (0)
  - _Requirements: 1.3, 3.1, 4.3_

- [x] 3. Enhance OpenRouter service initialization with cost protection

  - Add model validation during OpenRouterService constructor
  - Implement automatic switching to free alternative if paid model detected
  - Add comprehensive logging for model selection and cost information
  - Throw error if no free alternative exists for configured model
  - _Requirements: 3.1, 3.2, 4.2_

- [x] 4. Add request-level model validation and cost logging

  - Validate model is free before making API requests in makeRequest method
  - Add cost estimation logging for each request
  - Enhance error handling for billing-related API errors (402 status)
  - Include model cost information in request logs
  - _Requirements: 1.2, 3.3, 4.1_

- [x] 5. Update model switching functionality with safety checks

  - Modify switchModel function to validate free models only
  - Add warnings when attempting to switch to paid models
  - Update getCurrentModel to include cost information in logs
  - Ensure all model references use the updated free model names
  - _Requirements: 2.2, 2.3, 4.3_

- [x] 6. Create comprehensive test suite for model validation

  - Write unit tests for validateFreeModel function
  - Write unit tests for getFreeModelAlternative function
  - Write unit tests for getModelInfo function
  - Test OpenRouter service initialization with various model configurations
  - _Requirements: 1.1, 1.3, 2.1_

- [x] 7. Test API integration with free models

  - Test analyzeChemicalReaction with free Llama model
  - Test explainElement with free model configuration
  - Test assistantChat with cost protection enabled
  - Verify no charges are incurred during extended testing
  - _Requirements: 1.1, 1.2, 3.3_
