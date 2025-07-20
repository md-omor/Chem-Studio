# Implementation Plan

- [ ] 1. Create centralized color utility system

  - Create `/client/src/utils/element-colors.ts` with comprehensive color definitions and utility functions
  - Implement color validation and fallback mechanisms
  - Export functions for getting hex colors, Tailwind classes, and color validation
  - _Requirements: 2.1, 2.2, 4.1, 4.2_

- [ ] 2. Update storage layer to ensure consistent colorHex values

  - Modify `createElement` method in `server/storage.ts` to use color utility for colorHex assignment
  - Ensure all elements get valid colorHex values during initialization
  - Add fallback color assignment for edge cases
  - _Requirements: 1.2, 1.3, 4.2_

- [ ] 3. Update ElementCard component to use centralized color system

  - Modify `client/src/components/element-card.tsx` to use the new color utility
  - Remove hardcoded fallback color and use centralized fallback mechanism
  - Ensure colorHex is never undefined by using color utility fallbacks
  - _Requirements: 1.1, 1.2, 3.1_

- [ ] 4. Update PeriodicTableGrid to use consistent color system

  - Modify `client/src/components/periodic-table-grid.tsx` to use centralized colors
  - Replace local categoryColors object with color utility
  - Ensure grid colors match ElementCard colors
  - _Requirements: 3.1, 3.2_

- [ ] 5. Update periodic table page to use centralized colors

  - Modify `client/src/pages/periodic-table.tsx` to use color utility for legend and badges
  - Replace local categoryColors with centralized color system
  - Ensure selected element badges use consistent colors
  - _Requirements: 3.2, 3.3_

- [ ] 6. Add comprehensive unit tests for color system

  - Create test file for color utility functions
  - Test color generation for all element categories
  - Test fallback behavior for unknown categories and edge cases
  - Test hex color validation and Tailwind class generation
  - _Requirements: 2.1, 4.1, 4.2, 4.3_

- [ ] 7. Add integration tests for color consistency

  - Test that ElementCard and PeriodicTableGrid use same colors for same elements
  - Test color persistence across component updates
  - Test that selected element badges match periodic table colors
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 8. Validate accessibility and color contrast
  - Test color combinations meet WCAG AA contrast requirements
  - Ensure text readability on all colored backgrounds
  - Validate color system works for users with color vision deficiencies
  - _Requirements: 3.3_
