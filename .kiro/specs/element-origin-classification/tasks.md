# Implementation Plan

- [x] 1. Update database schema and types

  - Add origin field to elements table schema in shared/schema.ts
  - Update TypeScript interfaces to include ElementOrigin type
  - Update InsertElement and Element types to include origin field
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 2. Update storage layer with origin data

  - Add origin field to MemStorage element initialization
  - Classify all 118 elements with correct origin values (primordial/from_decay/synthetic)
  - Update createElement method to handle origin field
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 3. Create origin classification constants and utilities

  - Define ElementOrigin type and origin classification constants
  - Create utility functions for origin classification logic
  - Add origin descriptions for tooltips
  - _Requirements: 1.2, 3.2, 3.3, 3.4_

- [ ] 4. Update element card component to display origin

  - Modify ElementCard component to show origin classification
  - Add visual indicators for different origin types
  - Implement origin tooltip with explanatory text
  - _Requirements: 1.1, 1.2, 2.2_

- [ ] 5. Add origin filtering functionality

  - Create origin filter component for periodic table
  - Implement filtering logic by origin classification
  - Update periodic table to support origin-based filtering
  - _Requirements: 1.3, 2.1_

- [ ] 6. Update periodic table legend

  - Add origin classification symbols to table legend
  - Include explanatory text for each origin type
  - Ensure visual consistency with element indicators
  - _Requirements: 2.2, 2.3_

- [ ] 7. Add visual distinction for synthetic elements

  - Implement distinct visual markers for synthetic elements
  - Ensure synthetic elements are easily identifiable
  - Test visual accessibility and contrast
  - _Requirements: 2.3_

- [ ] 8. Write tests for origin classification
  - Create unit tests for origin classification logic
  - Test element filtering by origin type
  - Validate correct origin assignment for all elements
  - _Requirements: 3.1, 3.2, 3.3, 3.4_
