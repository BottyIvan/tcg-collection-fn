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
