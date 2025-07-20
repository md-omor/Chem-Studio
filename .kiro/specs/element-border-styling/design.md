# Design Document

## Overview

The element border styling feature enhances the visual appearance of the periodic table by applying category-specific border-radius styling to element cards. The system implements conditional styling logic that considers element category, period, group, and specific element exceptions to create a sophisticated visual hierarchy.

The design leverages the existing element data structure (category, period, group, symbol) to determine appropriate styling rules without requiring additional data storage or API changes.

## Architecture

### Component Architecture

The styling logic will be integrated into the existing `ElementCard` component through a new styling utility function. This approach maintains separation of concerns while keeping the styling logic centralized and testable.

```
ElementCard Component
├── getBorderRadiusStyle() - New styling function
├── getCategoryColor() - Existing color function
└── Existing component logic
```

### Data Flow

1. Element data (category, period, group, symbol) flows into ElementCard
2. getBorderRadiusStyle() processes element properties against styling rules
3. Computed border-radius classes are applied to the element container
4. Visual rendering reflects the category-specific styling

## Components and Interfaces

### Border Radius Styling Function

```typescript
interface BorderRadiusStyle {
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
}

function getBorderRadiusStyle(element: Element): BorderRadiusStyle;
```

### Styling Rules Engine

The styling logic implements a hierarchical rule system:

1. **Default Rule**: No border-radius for all elements
2. **Category Rules**: Apply bottom-right corner radius for specific categories
3. **Exception Rules**: Override category rules for specific elements
4. **Special Rules**: Apply square-type radius for specific period/group combinations

### Category Mapping

Based on the current element data structure, the following categories will be handled:

- `alkali-metal` → Bottom-right corner radius (except Fr)
- `alkaline-earth` → Bottom-right corner radius (except Fr)
- `transition-metal` → Bottom-right corner radius (with period 7 exceptions)
- `post-transition` → Bottom-right corner radius (with specific exceptions)
- `nonmetal` → Bottom-right corner radius (reactive nonmetals)
- `halogen` → Bottom-right corner radius (reactive nonmetals)
- `noble-gas` → Bottom-right corner radius (with exceptions)
- `metalloid` → Bottom-right corner radius (with exceptions)

## Data Models

### Element Interface (Existing)

```typescript
interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
  period: number;
  group: number | null;
  // ... other properties
}
```

### Styling Configuration

```typescript
interface StyleRule {
  category: string;
  defaultStyle: BorderRadiusStyle;
  exceptions: {
    elements?: string[]; // Element symbols to exclude
    periodGroupRules?: {
      period: number;
      group: number;
      style: BorderRadiusStyle;
    }[];
  };
}
```

## Error Handling

### Graceful Degradation

- If element data is missing required properties, default to no border-radius
- If category is unrecognized, apply no special styling
- Log warnings for unexpected data but continue rendering

### Validation

- Validate element properties before applying styling rules
- Ensure period and group values are within expected ranges
- Handle null/undefined group values gracefully

## Testing Strategy

### Unit Tests

1. **Rule Application Tests**

   - Test each category applies correct border-radius
   - Verify exception elements receive no styling
   - Validate period/group specific rules

2. **Edge Case Tests**

   - Test elements with missing category
   - Test elements with null group values
   - Test invalid period/group combinations

3. **Integration Tests**
   - Test styling function with real element data
   - Verify CSS classes are applied correctly
   - Test visual rendering in different scenarios

### Test Data

Create test fixtures covering:

- Representative elements from each category
- Exception elements (Fr, Po, Cn, At, Rn)
- Period 6 group 16, 17, 18 elements
- Period 7 transition metals

### Visual Testing

- Screenshot tests for different element categories
- Responsive design validation
- Cross-browser compatibility testing

## Implementation Details

### CSS Classes

Define utility classes for different border-radius types:

```css
.border-radius-bottom-right {
  border-bottom-right-radius: 0.5rem;
}

.border-radius-square {
  border-radius: 0.25rem;
}
```

### Performance Considerations

- Memoize styling calculations for identical elements
- Use CSS classes instead of inline styles for better performance
- Minimize DOM updates by batching style changes

### Accessibility

- Ensure border styling doesn't interfere with focus indicators
- Maintain sufficient color contrast with border styling
- Preserve keyboard navigation functionality

## Integration Points

### ElementCard Component

- Integrate getBorderRadiusStyle() into existing component
- Combine with existing styling logic (colors, selection states)
- Maintain backward compatibility

### CSS Framework Integration

- Work with existing Tailwind CSS classes
- Follow established design system patterns
- Ensure consistent spacing and sizing
