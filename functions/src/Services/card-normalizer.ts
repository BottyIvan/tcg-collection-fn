import { Brand } from "../enum/brand";
import { NormalizedCard, AnyTCGCard } from "../interface/card";
import { PokemonCard } from "../interface/card/pokemon";
import { DigimonCard } from "../interface/card/digimon";
import { DragonBallCard } from "../interface/card/dragonball";
import { PokemonCardAdapter } from "../adapters/pokemon-adapter";
import { DigimonCardAdapter } from "../adapters/digimon-adapter";
import { DragonBallCardAdapter } from "../adapters/dragonball-adapter";

/**
 * Card Normalizer Factory
 * Provides methods to normalize and denormalize cards based on brand
 */
export class CardNormalizer {
  /**
   * Normalizes a card from any TCG format to the common format
   * @param {AnyTCGCard} card - The card to normalize
   * @param {Brand} brand - The TCG brand
   * @return {NormalizedCard} The normalized card
   * @throws {Error} If the brand is not supported
   */
  static normalize(card: AnyTCGCard, brand: Brand): NormalizedCard {
    switch (brand) {
      case Brand.Pokemon:
        return PokemonCardAdapter.normalize(card as PokemonCard);

      case Brand.Digimon:
        return DigimonCardAdapter.normalize(card as DigimonCard);

      case Brand.DragonBallFusion:
        return DragonBallCardAdapter.normalize(card as DragonBallCard);

      // Add other brands as needed
      case Brand.OnePiece:
      case Brand.Magic:
      case Brand.UnionArena:
      case Brand.Gundam:
      case Brand.Riftbound:
      case Brand.StarWarsUnlimited:
        throw new Error(`Brand ${brand} normalization not yet implemented`);

      default:
        throw new Error(`Unknown brand: ${brand}`);
    }
  }

  /**
   * Normalizes an array of cards
   * @param {AnyTCGCard[]} cards - The cards to normalize
   * @param {Brand} brand - The TCG brand
   * @return {NormalizedCard[]} The normalized cards
   */
  static normalizeMany(cards: AnyTCGCard[], brand: Brand): NormalizedCard[] {
    return cards.map((card) => this.normalize(card, brand));
  }

  /**
   * Denormalizes a card back to its original format
   * @param {NormalizedCard} card - The normalized card
   * @return {AnyTCGCard} The denormalized card
   * @throws {Error} If the brand is not supported
   */
  static denormalize(card: NormalizedCard): AnyTCGCard {
    switch (card.brand) {
      case Brand.Pokemon:
        return PokemonCardAdapter.denormalize(card);

      case Brand.Digimon:
        return DigimonCardAdapter.denormalize(card);

      case Brand.DragonBallFusion:
        return DragonBallCardAdapter.denormalize(card);

      // Add other brands as needed
      case Brand.OnePiece:
      case Brand.Magic:
      case Brand.UnionArena:
      case Brand.Gundam:
      case Brand.Riftbound:
      case Brand.StarWarsUnlimited:
        throw new Error(
          `Brand ${card.brand} denormalization not yet implemented`,
        );

      default:
        throw new Error(`Unknown brand: ${card.brand}`);
    }
  }

  /**
   * Checks if a brand has normalization support
   * @param {Brand} brand - The brand to check
   * @return {boolean} True if the brand is supported
   */
  static isSupported(brand: Brand): boolean {
    return [Brand.Pokemon, Brand.Digimon, Brand.DragonBallFusion].includes(
      brand,
    );
  }

  /**
   * Gets the list of supported brands
   * @return {Brand[]} Array of supported brands
   */
  static getSupportedBrands(): Brand[] {
    return [Brand.Pokemon, Brand.Digimon, Brand.DragonBallFusion];
  }
}
