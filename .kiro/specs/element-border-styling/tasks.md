# Implementation Plan

- [ ] 1. Create border radius styling utility function

  - Implement `getBorderRadiusStyle()` function that takes an Element and returns appropriate CSS styling
  - Create TypeScript interface for BorderRadiusStyle return type
  - Implement default rule (no border-radius) as the base case
  - _Requirements: 1.1, 1.2, 9.2_

- [ ] 2. Implement category-specific styling rules

  - Add logic for reactive nonmetal elements (nonmetal and halogen categories) to apply bottom-right corner border-radius
  - Add logic for alkali-metal category to apply bottom-right corner border-radius
  - Add logic for alkaline-earth category to apply bottom-right corner border-radius
  - Add logic for transition-metal category to apply bottom-right corner border-radius
  - Add logic for post-transition category to apply bottom-right corner border-radius
  - Add logic for metalloid category to apply bottom-right corner border-radius
  - Add logic for noble-gas category to apply bottom-right corner border-radius
  - _Requirements: 2.1, 2.2, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1_

- [ ] 3. Implement element-specific exception rules

  - Add exception logic to exclude Francium (Fr) from alkali-metal and alkaline-earth styling
  - Add exception logic to exclude specific period 7 transition metals ["Fr", "Db", "Sg", "Bh", "Hs"] from border-radius
  - Add exception logic to exclude Polonium (Po) and Copernicium (Cn) from post-transition styling
  - Add exception logic to exclude Astatine (At) from metalloid styling
  - Add exception logic to exclude Radon (Rn) from noble-gas styling
  - _Requirements: 3.2, 4.2, 5.2, 6.2, 7.2, 8.2_

- [ ] 4. Implement period and group specific styling rules

  - Add logic for period 6 group 16 elements to apply square-type border-radius
  - Add logic for period 6 group 17 elements to apply square-type border-radius
  - Add logic for period 6 group 18 elements to apply square-type border-radius
  - Add logic for period 7 group 12 elements to have no border-radius
  - _Requirements: 6.3, 6.4, 7.3, 8.3_

- [ ] 5. Create CSS utility classes for border styling

  - Define `.border-radius-bottom-right` class for bottom-right corner styling
  - Define `.border-radius-square` class for square-type border styling
  - Ensure classes work with existing Tailwind CSS framework
  - Test classes render correctly with different element sizes
  - _Requirements: 1.2, 9.1_

- [ ] 6. Integrate styling function into ElementCard component

  - Import and call `getBorderRadiusStyle()` function in ElementCard component
  - Apply returned styling to the element container div
  - Ensure styling works with existing color and selection styling
  - Maintain backward compatibility with existing element rendering
  - _Requirements: 1.3, 9.3_

- [ ] 7. Create unit tests for styling logic

  - Write tests for each category's default styling behavior
  - Write tests for all element-specific exceptions
  - Write tests for period/group specific rules
  - Write tests for edge cases (missing data, invalid categories)
  - Create test fixtures with representative elements from each category
  - _Requirements: 9.1, 9.2_

- [ ] 8. Test integration with existing ElementCard functionality
  - Verify border styling works with element selection states
  - Verify border styling works with hover effects
  - Verify border styling works with existing color coding
  - Test responsive behavior across different screen sizes
  - Validate accessibility features remain functional
  - _Requirements: 1.3, 9.3_
