# Design Document

## Overview

This design enhances the visual indication system for the periodic table by improving element card styling, grid positioning, and visual feedback mechanisms. The solution focuses on CSS Grid optimization, enhanced border styling for element origins, improved color coding, and better user interaction states.

## Architecture

The enhancement builds upon the existing React component architecture:

- `PeriodicTableGrid`: Main grid container with CSS Grid layout
- `ElementCard`: Individual element display component with enhanced styling
- `periodic-table.tsx`: Parent page component with legend and interaction handling

The design maintains the current data flow while enhancing the visual presentation layer.

## Components and Interfaces

### Enhanced PeriodicTableGrid Component

**Responsibilities:**

- Optimized CSS Grid positioning for all elements including lanthanides/actinides
- Improved responsive grid layout
- Enhanced placeholder styling for element series

**Key Methods:**

- `getGridPosition()`: Enhanced positioning logic with better handling of special cases
- Grid styling improvements for consistent spacing and alignment

### Enhanced ElementCard Component

**Responsibilities:**

- Advanced border styling based on element origin
- Improved color coding system
- Enhanced hover and selection states
- Better typography hierarchy

**Key Properties:**

- Enhanced border radius calculations for origin types
- Improved color contrast and accessibility
- Better selection indicator positioning

### CSS Grid Layout Enhancements

**Grid Structure:**

```
- 18 columns (1 for period numbers + 17 for groups)
- 12 rows (1 for group headers + 7 for periods + 2 for lanthanide/actinide series + 2 spacing)
- Responsive grid gaps and sizing
- Proper alignment for all element types
```

## Data Models

### Element Origin Styling Map

```typescript
interface OriginStyling {
  primordial: {
    borderRadius: "0px 0px 30px 0px";
    borderWidth: "4px";
  };
  from_decay: {
    customSVGBorder: true;
    pathDefinition: "M4 4 L86 4 L86 55 L60 81 L4 81 Z";
  };
  synthetic: {
    borderRadius: "0px";
    borderWidth: "4px";
  };
}
```

### Category Color System

Enhanced color mapping with improved contrast and accessibility:

```typescript
interface CategoryColors {
  "alkali-metal": "#F95F5F";
  "alkaline-earth": "#F4C669";
  "transition-metal": "#F7AA97";
  "post-transition": "#4ADDDD";
  lanthanide: "#FF76A0";
  actinide: "#B5A7F9";
  metalloid: "#FF8B6C";
  nonmetal: "#C5E99B";
  halogen: "#C5E99B";
  "noble-gas": "#80D4F6";
  unknown: "#D8E9EF";
}
```

## Error Handling

### Grid Positioning Fallbacks

- Default positioning for elements without group/period data
- Graceful handling of missing element properties
- Fallback colors for unknown categories

### Visual State Management

- Consistent selection state handling
- Proper cleanup of hover states
- Error boundaries for rendering issues

## Testing Strategy

### Visual Regression Testing

- Screenshot comparisons for different element types
- Cross-browser compatibility testing
- Responsive design validation

### Interaction Testing

- Element selection/deselection workflows
- Hover state transitions
- Grid positioning accuracy

### Accessibility Testing

- Color contrast validation
- Keyboard navigation support
- Screen reader compatibility

### Unit Testing

- Grid positioning calculations
- Color mapping functions
- Border styling logic
- Selection state management

## Implementation Details

### CSS Grid Enhancements

The grid system will be optimized with:

- Proper `grid-template-columns` for 18-column layout
- Consistent `gap` spacing between elements
- Responsive sizing with `minmax()` functions
- Better alignment for lanthanide/actinide placeholders

### Border Styling System

Three distinct border styles:

1. **Primordial**: Rounded bottom-right corner using CSS `border-radius`
2. **From Decay**: Custom SVG path for pentagonal shape
3. **Synthetic**: Perfect square borders

### Enhanced Visual Feedback

- Improved hover states with scale and shadow effects
- Better selection indicators with ring styling
- Smooth transitions for all interactive states
- Enhanced color contrast for better readability

### Typography Improvements

- Consistent font sizing hierarchy
- Better text truncation handling
- Improved spacing between text elements
- Enhanced readability with proper contrast ratios
