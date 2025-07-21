# Design Document

## Overview

The element origin classification feature adds a new data field to track whether each element is Primordial (naturally occurring since Earth's formation), From decay (naturally occurring through radioactive decay), or Synthetic (artificially created). This classification will be stored in the database, displayed in the UI, and used for filtering functionality.

## Architecture

### Data Layer

- Add `origin` field to the elements table schema
- Update TypeScript interfaces to include origin classification
- Modify storage layer to handle the new field
- Update element initialization data with correct origin classifications

### UI Layer

- Add origin display to element cards
- Create visual indicators for different origin types
- Add origin information to element tooltips
- Update periodic table legend to include origin symbols

### Classification System

- **Primordial**: Elements 1-94 that occur naturally (except Tc-43 and Pm-61)
- **From decay**: Naturally occurring radioactive elements (Tc-43, Pm-61, and some isotopes)
- **Synthetic**: Elements 95-118 and artificially created isotopes

## Components and Interfaces

### Database Schema Updates

```typescript
// Add to elements table
origin: text("origin").notNull(); // "primordial" | "from_decay" | "synthetic"
```

### Type Definitions

```typescript
export type ElementOrigin = "primordial" | "from_decay" | "synthetic";

export interface Element {
  // ... existing fields
  origin: ElementOrigin;
}
```

### UI Components

- **OriginIndicator**: Small icon/badge showing origin type
- **OriginTooltip**: Explanatory tooltip for origin classifications
- **OriginFilter**: Filter component for periodic table
- **OriginLegend**: Legend entry explaining origin symbols

## Data Models

### Element Origin Classifications

**Primordial Elements (1-94, excluding 43 and 61):**

- H, He, Li, Be, B, C, N, O, F, Ne, Na, Mg, Al, Si, P, S, Cl, Ar, K, Ca, Sc, Ti, V, Cr, Mn, Fe, Co, Ni, Cu, Zn, Ga, Ge, As, Se, Br, Kr, Rb, Sr, Y, Zr, Nb, Mo, Ru, Rh, Pd, Ag, Cd, In, Sn, Sb, Te, I, Xe, Cs, Ba, La, Ce, Pr, Nd, Sm, Eu, Gd, Tb, Dy, Ho, Er, Tm, Yb, Lu, Hf, Ta, W, Re, Os, Ir, Pt, Au, Hg, Tl, Pb, Bi, Po, At, Rn, Fr, Ra, Ac, Th, Pa, U

**From Decay Elements:**

- Tc (43): Occurs naturally in trace amounts from uranium decay
- Pm (61): Occurs naturally in trace amounts from uranium decay

**Synthetic Elements (95-118):**

- Np, Pu, Am, Cm, Bk, Cf, Es, Fm, Md, No, Lr, Rf, Db, Sg, Bh, Hs, Mt, Ds, Rg, Cn, Nh, Fl, Mc, Lv, Ts, Og

### Visual Design

- **Primordial**: No special indicator (default state)
- **From decay**: Small radioactive symbol (☢) or decay indicator
- **Synthetic**: Laboratory flask icon (🧪) or "S" badge

## Error Handling

### Data Validation

- Ensure origin field is always one of the three valid values
- Validate origin assignments during element creation
- Handle missing origin data gracefully with default fallback

### UI Error States

- Display fallback text if origin data is unavailable
- Handle tooltip rendering errors gracefully
- Provide meaningful error messages for invalid origin values

## Testing Strategy

### Unit Tests

- Test origin classification assignment for all elements
- Validate origin field in database operations
- Test UI component rendering with different origin types

### Integration Tests

- Test element filtering by origin classification
- Verify tooltip functionality across different browsers
- Test periodic table display with origin indicators

### Data Validation Tests

- Verify correct origin assignment for all 118 elements
- Test edge cases (Tc and Pm special classifications)
- Validate synthetic element range (95-118)
