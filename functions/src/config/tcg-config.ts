import { Brand } from "../enum/brand";
import { TcgConfig } from "../interface/tcg-config";

/**
 * TCG data source configuration mapping brands to repository details.
 *
 * Used by GitHubService to construct URLs for fetching sets and cards data.
 * Each brand configuration includes:
 * - repo: Repository name
 * - baseUrl: Raw GitHub content URL
 * - setsPath: Path to sets data file
 * - cardsPath: Function returning path for a specific set's cards
 *
 * @example
 * const config = TCG_CONFIG[Brand.Pokemon];
 * const setsUrl = new URL(config.setsPath, config.baseUrl).toString();
 * const cardsUrl = new URL(
 *   config.cardsPath("base-set"),
 *   config.baseUrl
 * ).toString();
 */
export const TCG_CONFIG: Record<Brand, TcgConfig> = {
  [Brand.Pokemon]: {
    repo: "pokemon-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/pokemon-tcg-data/refs/heads/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.Digimon]: {
    repo: "digimon-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/digimon-tcg-data/refs/heads/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.OnePiece]: {
    repo: "one-piece-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/one-piece-tcg-data/refs/heads/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.DragonBallFusion]: {
    repo: "dragon-ball-fusion-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/dragon-ball-fusion-tcg-data/refs/heads/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.Magic]: {
    repo: "magic-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/magic-tcg-data/refs/heads/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.UnionArena]: {
    repo: "union-arena-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/union-arena-tcg-data/refs/heads/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.Gundam]: {
    repo: "gundam-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/gundam-tcg-data/refs/heads/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.Riftbound]: {
    repo: "riftbound-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/riftbound-tcg-data/refs/heads/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.StarWarsUnlimited]: {
    repo: "star-wars-unlimited-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/star-wars-unlimited-tcg-data/refs/heads/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
};
