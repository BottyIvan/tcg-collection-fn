import { Brand } from "../enum/brand";
import { DigimonCard } from "./card/digimon";
import { DragonBallCard } from "./card/dragonball";
import { PokemonCard } from "./card/pokemon";

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
 * Union type for all TCG card types
 */
export type AnyTCGCard = PokemonCard | DigimonCard | DragonBallCard;
