# Design Document

## Overview

The periodic table layout design implements the scientifically accurate positioning of chemical elements in an 18-column by 7-row grid system. This design ensures proper element placement according to their atomic structure and periodic properties, with special handling for lanthanides and actinides.

## Architecture

The periodic table layout uses a CSS Grid system with precise positioning logic:

- **Main Grid**: 18 columns × 7 rows for periods 1-7
- **Lanthanide Row**: Separate row below main grid for elements 57-71
- **Actinide Row**: Separate row below lanthanides for elements 89-103
- **Responsive Design**: Maintains layout integrity across different screen sizes

## Components and Interfaces

### PeriodicTableGrid Component

- **Purpose**: Main container for the periodic table layout
- **Grid System**: CSS Grid with 18 columns and 10 total rows (7 main + 1 spacer + 2 for lanthanides/actinides)
- **Positioning Logic**: Calculates correct grid positions based on element properties

### Element Positioning Algorithm

```typescript
interface ElementPosition {
  gridColumn: number;
  gridRow: number;
}

function getGridPosition(element: Element): ElementPosition;
```

**Positioning Rules:**

1. **Standard Elements**: Use period (row) and group (column) directly
2. **Hydrogen**: Special case - column 1, row 1
3. **Helium**: Special case - column 18, row 1
4. **Lanthanides (57-71)**: Row 9, columns 1-15
5. **Actinides (89-103)**: Row 10, columns 1-15
6. **Placeholder Elements**: Row 6 column 3 (La-Lu), Row 7 column 3 (Ac-Lr)

### Grid Layout Structure

```css
.periodic-table-grid {
  display: grid;
  grid-template-columns: repeat(18, minmax(60px, 1fr));
  grid-template-rows:
    repeat(7, minmax(60px, auto)) /* Main periods 1-7 */
    40px /* Spacer row */
    minmax(60px, auto) /* Lanthanides */
    minmax(60px, auto); /* Actinides */
  gap: 4px;
}
```

## Data Models

### Element Interface (existing)

```typescript
interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  period: number;
  group: number | null;
  category: string;
  // ... other properties
}
```

### Position Mapping

- **Period 1**: H(1,1), He(18,1)
- **Period 2**: Li(1,2), Be(2,2), B(13,2), C(14,2), N(15,2), O(16,2), F(17,2), Ne(18,2)
- **Period 3**: Na(1,3), Mg(2,3), Al(13,3), Si(14,3), P(15,3), S(16,3), Cl(17,3), Ar(18,3)
- **Periods 4-7**: Standard group positioning (1-18)
- **Lanthanides**: La-Lu in row 9, columns 1-15
- **Actinides**: Ac-Lr in row 10, columns 1-15

## Error Handling

### Missing Element Data

- **Fallback Position**: Default to group 1 if group is null
- **Validation**: Check for valid period and atomic number ranges
- **Error Logging**: Log positioning errors for debugging

### Invalid Positioning

- **Boundary Checks**: Ensure positions are within grid bounds
- **Duplicate Detection**: Prevent multiple elements in same position
- **Visual Feedback**: Highlight positioning conflicts in development

## Testing Strategy

### Unit Tests

1. **Position Calculation Tests**

   - Test standard element positioning
   - Test special cases (H, He, lanthanides, actinides)
   - Test edge cases and invalid data

2. **Grid Layout Tests**
   - Verify CSS grid structure
   - Test responsive behavior
   - Validate gap and spacing

### Integration Tests

1. **Element Rendering Tests**

   - Verify all elements render in correct positions
   - Test placeholder elements for lanthanides/actinides
   - Validate visual layout matches scientific standard

2. **Interaction Tests**
   - Test element selection with new positioning
   - Verify modal functionality works with repositioned elements
   - Test hover effects and visual feedback

### Visual Regression Tests

1. **Layout Comparison**
   - Compare rendered table with reference periodic table
   - Verify element spacing and alignment
   - Test across different screen sizes

## Implementation Approach

### Phase 1: Core Positioning Logic

- Update `getGridPosition` function with correct positioning rules
- Handle special cases for hydrogen, helium, and noble gases
- Implement lanthanide and actinide positioning

### Phase 2: Grid Structure Updates

- Update CSS grid template to accommodate proper row structure
- Add spacer row between main table and lanthanides/actinides
- Ensure responsive behavior is maintained

### Phase 3: Placeholder Elements

- Create proper placeholder components for lanthanide/actinide series
- Position placeholders in correct locations (period 6/7, group 3)
- Style placeholders to match overall design

### Phase 4: Testing and Validation

- Verify positioning against scientific periodic table
- Test all interactive functionality
- Ensure responsive design works correctly
