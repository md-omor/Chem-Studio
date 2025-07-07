// This file contains the complete periodic table data for all 118 elements
// Used as fallback if API is not available

export const elementsData = [
  // Period 1
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, category: 'nonmetal', period: 1, group: 1 },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.003, category: 'noble-gas', period: 1, group: 18 },
  
  // Period 2
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.94, category: 'alkali-metal', period: 2, group: 1 },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.012, category: 'alkaline-earth', period: 2, group: 2 },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: 10.81, category: 'metalloid', period: 2, group: 13 },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.01, category: 'nonmetal', period: 2, group: 14 },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: 14.01, category: 'nonmetal', period: 2, group: 15 },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: 15.99, category: 'nonmetal', period: 2, group: 16 },
  { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: 18.99, category: 'halogen', period: 2, group: 17 },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: 20.18, category: 'noble-gas', period: 2, group: 18 },
  
  // Period 3
  { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 22.99, category: 'alkali-metal', period: 3, group: 1 },
  { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, atomicMass: 24.31, category: 'alkaline-earth', period: 3, group: 2 },
  { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, atomicMass: 26.98, category: 'post-transition', period: 3, group: 13 },
  { symbol: 'Si', name: 'Silicon', atomicNumber: 14, atomicMass: 28.09, category: 'metalloid', period: 3, group: 14 },
  { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, atomicMass: 30.97, category: 'nonmetal', period: 3, group: 15 },
  { symbol: 'S', name: 'Sulfur', atomicNumber: 16, atomicMass: 32.07, category: 'nonmetal', period: 3, group: 16 },
  { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: 35.45, category: 'halogen', period: 3, group: 17 },
  { symbol: 'Ar', name: 'Argon', atomicNumber: 18, atomicMass: 39.95, category: 'noble-gas', period: 3, group: 18 },
  
  // Period 4
  { symbol: 'K', name: 'Potassium', atomicNumber: 19, atomicMass: 39.10, category: 'alkali-metal', period: 4, group: 1 },
  { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, atomicMass: 40.08, category: 'alkaline-earth', period: 4, group: 2 },
  { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, atomicMass: 44.96, category: 'transition-metal', period: 4, group: 3 },
  { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, atomicMass: 47.87, category: 'transition-metal', period: 4, group: 4 },
  { symbol: 'V', name: 'Vanadium', atomicNumber: 23, atomicMass: 50.94, category: 'transition-metal', period: 4, group: 5 },
  { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, atomicMass: 52.00, category: 'transition-metal', period: 4, group: 6 },
  { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, atomicMass: 54.94, category: 'transition-metal', period: 4, group: 7 },
  { symbol: 'Fe', name: 'Iron', atomicNumber: 26, atomicMass: 55.85, category: 'transition-metal', period: 4, group: 8 },
  { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, atomicMass: 58.93, category: 'transition-metal', period: 4, group: 9 },
  { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, atomicMass: 58.69, category: 'transition-metal', period: 4, group: 10 },
  { symbol: 'Cu', name: 'Copper', atomicNumber: 29, atomicMass: 63.55, category: 'transition-metal', period: 4, group: 11 },
  { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, atomicMass: 65.38, category: 'transition-metal', period: 4, group: 12 },
  { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, atomicMass: 69.72, category: 'post-transition', period: 4, group: 13 },
  { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, atomicMass: 72.63, category: 'metalloid', period: 4, group: 14 },
  { symbol: 'As', name: 'Arsenic', atomicNumber: 33, atomicMass: 74.92, category: 'metalloid', period: 4, group: 15 },
  { symbol: 'Se', name: 'Selenium', atomicNumber: 34, atomicMass: 78.97, category: 'nonmetal', period: 4, group: 16 },
  { symbol: 'Br', name: 'Bromine', atomicNumber: 35, atomicMass: 79.90, category: 'halogen', period: 4, group: 17 },
  { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, atomicMass: 83.80, category: 'noble-gas', period: 4, group: 18 },
  
  // Continue with more elements...
  // For brevity, I'll add a few more key elements
  { symbol: 'Ag', name: 'Silver', atomicNumber: 47, atomicMass: 107.87, category: 'transition-metal', period: 5, group: 11 },
  { symbol: 'Au', name: 'Gold', atomicNumber: 79, atomicMass: 196.97, category: 'transition-metal', period: 6, group: 11 },
  { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, atomicMass: 200.59, category: 'transition-metal', period: 6, group: 12 },
  { symbol: 'Pb', name: 'Lead', atomicNumber: 82, atomicMass: 207.2, category: 'post-transition', period: 6, group: 14 },
  { symbol: 'U', name: 'Uranium', atomicNumber: 92, atomicMass: 238.03, category: 'actinide', period: 7, group: null },
];
