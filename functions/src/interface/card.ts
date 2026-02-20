import { Brand } from "../enum/brand";

/**
 * Card images structure
 */
export interface CardImages {
  small: string;
  large: string;
}

/**
 * Card set information
 */
export interface CardSet {
  id: string;
  name: string;
}

/**
 * Cost information for different types of actions
 */
export interface CardCost {
  type: "play" | "attack" | "evolve" | "specified" | "combo";
  value: string | string[];
  name?: string; // For attack costs (Pokemon)
  damage?: string; // For attack damage (Pokemon)
}

/**
 * Normalized card interface - common structure across all TCG brands
 */
export interface NormalizedCard {
  // Core identifiers
  id: string;
  code?: string;
  name: string;
  brand: Brand;

  // Common attributes
  rarity?: string;
  images: CardImages;
  set?: CardSet;

  // Normalized fields
  cardType: string; // LEADER, BATTLE, Pokémon, Digi-Egg, etc.
  subtypes?: string[]; // Stage 1, In-Training, etc.
  power?: string; // hp, dp, power
  costs?: CardCost[]; // Play cost, attack costs, evolve costs
  colors?: string[]; // Card colors/types

  // Additional info
  artist?: string;
  number?: string;
  level?: string;

  // Text fields
  effect?: string;
  flavorText?: string;

  // Original data preservation
  rawData: Record<string, unknown>;
}

/**
 * Pokemon attack structure
 */
export interface PokemonAttack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

/**
 * Pokemon TCG specific card structure
 */
export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes?: string[];
  level?: string;
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  attacks?: PokemonAttack[];
  weaknesses?: Array<{
    type: string;
    value: string;
  }>;
  resistances?: Array<{
    type: string;
    value: string;
  }>;
  retreatCost?: string[];
  convertedRetreatCost?: number;
  number?: string;
  artist?: string;
  rarity?: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities?: Record<string, string>;
  images: {
    small: string;
    large: string;
  };
  set?: {
    id: string;
    name: string;
  };
}

/**
 * Digimon TCG specific card structure
 */
export interface DigimonCard {
  id: string;
  code: string;
  name: string;
  level?: string;
  colors: string[];
  images: {
    small: string;
    large: string;
  };
  cardType: string;
  form?: string;
  attribute?: string;
  type?: string;
  dp?: string;
  playCost?: string;
  digivolveCost1?: string;
  digivolveCost2?: string;
  effect?: string;
  inheritedEffect?: string;
  securityEffect?: string;
  notes?: string;
  set: {
    id: string;
    name: string;
  };
  rarity?: string;
}

/**
 * Dragon Ball Fusion TCG specific card structure
 */
export interface DragonBallCard {
  id: string;
  code: string;
  rarity: string;
  name: string;
  color: string;
  images: {
    small: string;
    large: string;
  };
  cardType: string;
  cost?: string;
  specifiedCost?: string;
  power?: string;
  comboPower?: string;
  features?: string;
  effect?: string;
  getIt?: string;
  set: {
    id: string;
    name: string;
  };
}

/**
 * Union type for all TCG card types
 */
export type AnyTCGCard = PokemonCard | DigimonCard | DragonBallCard;
