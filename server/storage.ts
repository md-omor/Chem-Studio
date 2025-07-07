import { users, elements, reactions, type User, type InsertUser, type Element, type InsertElement, type Reaction, type InsertReaction } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllElements(): Promise<Element[]>;
  getElementById(id: number): Promise<Element | undefined>;
  getElementBySymbol(symbol: string): Promise<Element | undefined>;
  createElement(element: InsertElement): Promise<Element>;
  
  getAllReactions(): Promise<Reaction[]>;
  getReactionByReactants(reactants: string[]): Promise<Reaction | undefined>;
  createReaction(reaction: InsertReaction): Promise<Reaction>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private elements: Map<number, Element>;
  private reactions: Map<number, Reaction>;
  private currentUserId: number;
  private currentElementId: number;
  private currentReactionId: number;

  constructor() {
    this.users = new Map();
    this.elements = new Map();
    this.reactions = new Map();
    this.currentUserId = 1;
    this.currentElementId = 1;
    this.currentReactionId = 1;
    
    // Initialize with basic elements and reactions
    this.initializeData();
  }

  private async initializeData() {
    // Initialize elements (subset for demo)
    const elementData = [
      { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, category: 'nonmetal', period: 1, group: 1, electronConfiguration: '1s¹', meltingPoint: '-259.1°C', boilingPoint: '-252.9°C', uses: 'Fuel cells, rocket fuel, industrial processes', fact: 'Hydrogen is the most abundant element in the universe, making up about 75% of all matter.' },
      { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.003, category: 'noble-gas', period: 1, group: 18, electronConfiguration: '1s²', meltingPoint: '-272.2°C', boilingPoint: '-268.9°C', uses: 'Balloons, welding, medical equipment', fact: 'Helium is the second most abundant element in the universe but very rare on Earth.' },
      { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.94, category: 'alkali-metal', period: 2, group: 1, electronConfiguration: '[He] 2s¹', meltingPoint: '180.5°C', boilingPoint: '1342°C', uses: 'Batteries, ceramics, mental health medication', fact: 'Lithium is the lightest metal and can cut with a knife.' },
      { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.012, category: 'alkaline-earth', period: 2, group: 2, electronConfiguration: '[He] 2s²', meltingPoint: '1287°C', boilingPoint: '2468°C', uses: 'Aerospace alloys, nuclear reactors, X-ray equipment', fact: 'Beryllium is transparent to X-rays and is used in X-ray tube windows.' },
      { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: 10.81, category: 'metalloid', period: 2, group: 13, electronConfiguration: '[He] 2s² 2p¹', meltingPoint: '2076°C', boilingPoint: '4000°C', uses: 'Glass, detergents, semiconductors', fact: 'Boron is essential for plant growth and is used in high-strength glass.' },
      { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.01, category: 'nonmetal', period: 2, group: 14, electronConfiguration: '[He] 2s² 2p²', meltingPoint: '3550°C', boilingPoint: '4027°C', uses: 'Diamond, graphite, organic compounds, steel', fact: 'Carbon can form more compounds than any other element except hydrogen.' },
      { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: 14.01, category: 'nonmetal', period: 2, group: 15, electronConfiguration: '[He] 2s² 2p³', meltingPoint: '-210.0°C', boilingPoint: '-195.8°C', uses: 'Fertilizers, explosives, food preservation', fact: 'Nitrogen makes up about 78% of Earth\'s atmosphere.' },
      { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: 15.99, category: 'nonmetal', period: 2, group: 16, electronConfiguration: '[He] 2s² 2p⁴', meltingPoint: '-218.3°C', boilingPoint: '-182.9°C', uses: 'Breathing, combustion, water, medical oxygen', fact: 'Oxygen is the most abundant element in Earth\'s crust.' },
      { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: 18.99, category: 'halogen', period: 2, group: 17, electronConfiguration: '[He] 2s² 2p⁵', meltingPoint: '-219.7°C', boilingPoint: '-188.1°C', uses: 'Toothpaste, Teflon, refrigerants', fact: 'Fluorine is the most electronegative element and highly reactive.' },
      { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: 20.18, category: 'noble-gas', period: 2, group: 18, electronConfiguration: '[He] 2s² 2p⁶', meltingPoint: '-248.6°C', boilingPoint: '-246.1°C', uses: 'Neon signs, lasers, cryogenics', fact: 'Neon gives off a distinctive red-orange glow when used in gas-discharge tubes.' },
      { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 22.99, category: 'alkali-metal', period: 3, group: 1, electronConfiguration: '[Ne] 3s¹', meltingPoint: '97.8°C', boilingPoint: '883°C', uses: 'Table salt, soap, street lights', fact: 'Sodium is so reactive that it must be stored under oil to prevent reaction with air.' },
      { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, atomicMass: 24.31, category: 'alkaline-earth', period: 3, group: 2, electronConfiguration: '[Ne] 3s²', meltingPoint: '650°C', boilingPoint: '1090°C', uses: 'Lightweight alloys, fireworks, photography', fact: 'Magnesium burns with a brilliant white flame and is used in fireworks and photography.' },
      { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, atomicMass: 26.98, category: 'post-transition', period: 3, group: 13, electronConfiguration: '[Ne] 3s² 3p¹', meltingPoint: '660.3°C', boilingPoint: '2519°C', uses: 'Cans, aircraft, building materials', fact: 'Aluminum is the most abundant metal in Earth\'s crust but was once more valuable than gold.' },
      { symbol: 'Si', name: 'Silicon', atomicNumber: 14, atomicMass: 28.09, category: 'metalloid', period: 3, group: 14, electronConfiguration: '[Ne] 3s² 3p²', meltingPoint: '1414°C', boilingPoint: '3265°C', uses: 'Computer chips, glass, solar panels', fact: 'Silicon is the second most abundant element in Earth\'s crust and is essential for computer technology.' },
      { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, atomicMass: 30.97, category: 'nonmetal', period: 3, group: 15, electronConfiguration: '[Ne] 3s² 3p³', meltingPoint: '44.2°C', boilingPoint: '280.5°C', uses: 'Fertilizers, matches, DNA, bones', fact: 'Phosphorus glows in the dark and is essential for all life on Earth.' },
      { symbol: 'S', name: 'Sulfur', atomicNumber: 16, atomicMass: 32.07, category: 'nonmetal', period: 3, group: 16, electronConfiguration: '[Ne] 3s² 3p⁴', meltingPoint: '115.2°C', boilingPoint: '444.6°C', uses: 'Rubber, gunpowder, fertilizers', fact: 'Sulfur has been known since ancient times and is mentioned in religious texts.' },
      { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: 35.45, category: 'halogen', period: 3, group: 17, electronConfiguration: '[Ne] 3s² 3p⁵', meltingPoint: '-101.5°C', boilingPoint: '-34.0°C', uses: 'Water purification, bleach, PVC plastic', fact: 'Chlorine is essential for swimming pool sanitation and water treatment.' },
      { symbol: 'Ar', name: 'Argon', atomicNumber: 18, atomicMass: 39.95, category: 'noble-gas', period: 3, group: 18, electronConfiguration: '[Ne] 3s² 3p⁶', meltingPoint: '-189.3°C', boilingPoint: '-185.8°C', uses: 'Welding, light bulbs, wine preservation', fact: 'Argon makes up about 1% of Earth\'s atmosphere and is used to protect materials from oxidation.' },
      { symbol: 'K', name: 'Potassium', atomicNumber: 19, atomicMass: 39.10, category: 'alkali-metal', period: 4, group: 1, electronConfiguration: '[Ar] 4s¹', meltingPoint: '63.4°C', boilingPoint: '759°C', uses: 'Fertilizers, bananas, nerve function', fact: 'Potassium is essential for life and is found in high concentrations in bananas.' },
      { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, atomicMass: 40.08, category: 'alkaline-earth', period: 4, group: 2, electronConfiguration: '[Ar] 4s²', meltingPoint: '842°C', boilingPoint: '1484°C', uses: 'Bones, teeth, concrete, milk', fact: 'Calcium is the fifth most abundant element in Earth\'s crust and is essential for bone health.' },
      { symbol: 'Fe', name: 'Iron', atomicNumber: 26, atomicMass: 55.85, category: 'transition-metal', period: 4, group: 8, electronConfiguration: '[Ar] 3d⁶ 4s²', meltingPoint: '1538°C', boilingPoint: '2861°C', uses: 'Steel, construction, red blood cells', fact: 'Iron is the most abundant element on Earth by mass and is essential for oxygen transport in blood.' },
      { symbol: 'Cu', name: 'Copper', atomicNumber: 29, atomicMass: 63.55, category: 'transition-metal', period: 4, group: 11, electronConfiguration: '[Ar] 3d¹⁰ 4s¹', meltingPoint: '1085°C', boilingPoint: '2562°C', uses: 'Electrical wiring, plumbing, coins', fact: 'Copper is one of the few metals that occurs naturally in its metallic form.' },
      { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, atomicMass: 65.38, category: 'transition-metal', period: 4, group: 12, electronConfiguration: '[Ar] 3d¹⁰ 4s²', meltingPoint: '419.5°C', boilingPoint: '907°C', uses: 'Galvanizing, batteries, dietary supplements', fact: 'Zinc is essential for human health and is found in many foods.' },
      { symbol: 'Br', name: 'Bromine', atomicNumber: 35, atomicMass: 79.90, category: 'halogen', period: 4, group: 17, electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁵', meltingPoint: '-7.3°C', boilingPoint: '58.8°C', uses: 'Flame retardants, photography, water treatment', fact: 'Bromine is one of only two elements that are liquid at room temperature.' },
      { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, atomicMass: 83.80, category: 'noble-gas', period: 4, group: 18, electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁶', meltingPoint: '-157.4°C', boilingPoint: '-153.2°C', uses: 'Photography, lasers, energy-efficient windows', fact: 'Krypton is used in high-performance windows and produces a bright white light in photography.' },
      { symbol: 'Ag', name: 'Silver', atomicNumber: 47, atomicMass: 107.87, category: 'transition-metal', period: 5, group: 11, electronConfiguration: '[Kr] 4d¹⁰ 5s¹', meltingPoint: '961.8°C', boilingPoint: '2162°C', uses: 'Jewelry, photography, electronics', fact: 'Silver has the highest electrical conductivity of any element.' },
      { symbol: 'Au', name: 'Gold', atomicNumber: 79, atomicMass: 196.97, category: 'transition-metal', period: 6, group: 11, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', meltingPoint: '1064.2°C', boilingPoint: '2856°C', uses: 'Jewelry, electronics, currency', fact: 'Gold is so unreactive that it can be found in nature in its pure form.' },
    ];

    for (const element of elementData) {
      await this.createElement(element);
    }

    // Initialize reactions
    const reactionData = [
      { reactants: '["H","O"]', product: 'H₂O', productName: 'Water', description: 'Water is the most important compound for life on Earth.', uses: 'Drinking, cooking, cleaning, industrial processes, and supporting all life forms.', facts: 'Water covers about 71% of Earth\'s surface and the human body is about 60% water.' },
      { reactants: '["Na","Cl"]', product: 'NaCl', productName: 'Sodium Chloride', description: 'Common table salt, essential for human nutrition.', uses: 'Food seasoning, food preservation, de-icing roads, and industrial chemical production.', facts: 'Salt was once so valuable it was used as currency, giving us the word "salary".' },
      { reactants: '["C","O"]', product: 'CO₂', productName: 'Carbon Dioxide', description: 'A greenhouse gas essential for plant photosynthesis.', uses: 'Carbonated beverages, fire extinguishers, dry ice, and photosynthesis.', facts: 'CO₂ is what makes bread rise and is used by plants to make oxygen.' },
      { reactants: '["H","Cl"]', product: 'HCl', productName: 'Hydrochloric Acid', description: 'A strong acid used in industry and naturally found in stomach acid.', uses: 'Steel production, food processing, swimming pool maintenance, and digestion.', facts: 'Your stomach produces about 2-3 liters of hydrochloric acid daily to digest food.' },
      { reactants: '["Ca","C","O"]', product: 'CaCO₃', productName: 'Calcium Carbonate', description: 'The main component of limestone, marble, and seashells.', uses: 'Construction materials, paper production, toothpaste, and antacids.', facts: 'Calcium carbonate is what makes eggshells strong and is used in chalk.' },
      { reactants: '["Fe","O"]', product: 'Fe₂O₃', productName: 'Iron Oxide (Rust)', description: 'The common rust that forms when iron reacts with oxygen.', uses: 'Pigments, polishing compounds, magnetic storage media.', facts: 'Rust is what gives Mars its red color - the planet is covered in iron oxide.' },
      { reactants: '["Cu","O"]', product: 'CuO', productName: 'Copper Oxide', description: 'A black compound formed when copper is heated in air.', uses: 'Catalysts, ceramics, batteries, and semiconductors.', facts: 'Copper oxide gives the green patina color to old copper statues like the Statue of Liberty.' },
    ];

    for (const reaction of reactionData) {
      await this.createReaction(reaction);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllElements(): Promise<Element[]> {
    return Array.from(this.elements.values()).sort((a, b) => a.atomicNumber - b.atomicNumber);
  }

  async getElementById(id: number): Promise<Element | undefined> {
    return this.elements.get(id);
  }

  async getElementBySymbol(symbol: string): Promise<Element | undefined> {
    return Array.from(this.elements.values()).find((element) => element.symbol === symbol);
  }

  async createElement(insertElement: InsertElement): Promise<Element> {
    const id = this.currentElementId++;
    const element: Element = { ...insertElement, id };
    this.elements.set(id, element);
    return element;
  }

  async getAllReactions(): Promise<Reaction[]> {
    return Array.from(this.reactions.values());
  }

  async getReactionByReactants(reactants: string[]): Promise<Reaction | undefined> {
    const sortedReactants = reactants.sort();
    return Array.from(this.reactions.values()).find((reaction) => {
      const reactionReactants = JSON.parse(reaction.reactants).sort();
      return JSON.stringify(reactionReactants) === JSON.stringify(sortedReactants);
    });
  }

  async createReaction(insertReaction: InsertReaction): Promise<Reaction> {
    const id = this.currentReactionId++;
    const reaction: Reaction = { ...insertReaction, id };
    this.reactions.set(id, reaction);
    return reaction;
  }
}

export const storage = new MemStorage();
