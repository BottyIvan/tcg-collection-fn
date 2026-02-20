export enum Brand {
  OnePiece = "one-piece",
  Pokemon = "pokemon",
  DragonBallFusion = "dragon-ball-fusion",
  Digimon = "digimon",
  Magic = "magic",
  UnionArena = "union-arena",
  Gundam = "gundam",
  Riftbound = "riftbound",
  StarWarsUnlimited = "star-wars-unlimited",
}

/**
 * List of currently supported brands with implemented adapters
 */
export const SUPPORTED_BRANDS: Brand[] = [
  Brand.Pokemon,
  Brand.Digimon,
  Brand.DragonBallFusion,
];
