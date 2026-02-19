import { Brand } from "../enum/brand";
import { TcgConfig } from "../interface/tcg-config";
export const TCG_CONFIG: Record<Brand, TcgConfig> = {
  [Brand.Pokemon]: {
    repo: "pokemon-tcg-data",
    baseUrl: "https://raw.githubusercontent.com/apitcg/pokemon-tcg-data/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.Digimon]: {
    repo: "digimon-tcg-data",
    baseUrl: "https://raw.githubusercontent.com/apitcg/digimon-tcg-data/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.OnePiece]: {
    repo: "one-piece-tcg-data",
    baseUrl: "https://raw.githubusercontent.com/apitcg/one-piece-tcg-data/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.DragonBallFusion]: {
    repo: "dragon-ball-fusion-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/dragon-ball-fusion-tcg-data/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.Magic]: {
    repo: "magic-tcg-data",
    baseUrl: "https://raw.githubusercontent.com/apitcg/magic-tcg-data/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.UnionArena]: {
    repo: "union-arena-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/union-arena-tcg-data/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.Gundam]: {
    repo: "gundam-tcg-data",
    baseUrl: "https://raw.githubusercontent.com/apitcg/gundam-tcg-data/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.Riftbound]: {
    repo: "riftbound-tcg-data",
    baseUrl: "https://raw.githubusercontent.com/apitcg/riftbound-tcg-data/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
  [Brand.StarWarsUnlimited]: {
    repo: "star-wars-unlimited-tcg-data",
    baseUrl:
      "https://raw.githubusercontent.com/apitcg/star-wars-unlimited-tcg-data/main",
    setsPath: "sets/en.json",
    cardsPath: (setId) => `cards/en/${setId}.json`,
  },
};
