# Requirements Document

## Introduction

The user is experiencing unexpected charges when using OpenRouter API despite intending to use the free Llama 3.1 405B model. The current configuration is using the paid version (`meta-llama/llama-3.1-405b-instruct`) instead of the free version (`meta-llama/llama-3.1-405b-instruct:free`). This feature will fix the configuration to ensure only free models are used and provide safeguards against accidental paid usage.

## Requirements

### Requirement 1

**User Story:** As a developer using the ChemVerse app, I want to use only free AI models so that I don't incur unexpected charges.

#### Acceptance Criteria

1. WHEN the application starts THEN the system SHALL use the free version of Llama 3.1 405B model (`meta-llama/llama-3.1-405b-instruct:free`)
2. WHEN making API requests THEN the system SHALL only use models with `:free` suffix
3. IF a paid model is accidentally configured THEN the system SHALL log a warning and switch to the free equivalent

### Requirement 2

**User Story:** As a developer, I want clear configuration options so that I can easily switch between free models without risk of using paid ones.

#### Acceptance Criteria

1. WHEN viewing the AI configuration THEN the system SHALL clearly separate free and paid models
2. WHEN switching models THEN the system SHALL only allow selection of free models by default
3. WHEN a free model is selected THEN the system SHALL validate it has the `:free` suffix

### Requirement 3

**User Story:** As a developer, I want cost protection mechanisms so that I'm warned before using any paid models.

#### Acceptance Criteria

1. WHEN initializing the OpenRouter service THEN the system SHALL validate the current model is free
2. IF a paid model is detected THEN the system SHALL log an error and refuse to make requests
3. WHEN making API requests THEN the system SHALL include cost estimation logging

### Requirement 4

**User Story:** As a developer, I want to easily identify which models are free so that I can make informed choices.

#### Acceptance Criteria

1. WHEN viewing model options THEN the system SHALL clearly label free models
2. WHEN displaying current model THEN the system SHALL show whether it's free or paid
3. WHEN switching models THEN the system SHALL display cost information for each option
