import { Brand } from "../enum/brand";
import { NormalizedCard, CardCost } from "../interface/card";
import { PokemonCard, PokemonAttack } from "../interface/card/pokemon";

/**
 * Adapter for normalizing Pokemon TCG cards
 */
export class PokemonCardAdapter {
  /**
   * Converts a Pokemon card to the normalized format
   * @param {PokemonCard} card - The Pokemon card to normalize
   * @return {NormalizedCard} The normalized card
   */
  static normalize(card: PokemonCard): NormalizedCard {
    const costs: CardCost[] = [];

    // Add attack costs
    if (card.attacks && card.attacks.length > 0) {
      card.attacks.forEach((attack: PokemonAttack) => {
        costs.push({
          type: "attack",
          value: attack.cost,
          name: attack.name,
          damage: attack.damage,
        });
      });
    }

    // Add retreat cost
    if (card.retreatCost && card.retreatCost.length > 0) {
      costs.push({
        type: "play",
        value: card.retreatCost,
        name: "Retreat",
      });
    }

    const normalized: NormalizedCard = {
      id: card.id,
      name: card.name,
      brand: Brand.Pokemon,
      cardType: card.supertype,
      subtypes: card.subtypes,
      power: card.hp,
      rarity: card.rarity,
      images: card.images,
      set: card.set,
      costs: costs.length > 0 ? costs : undefined,
      colors: card.types,
      artist: card.artist,
      number: card.number,
      level: card.level,
      flavorText: card.flavorText,
      rawData: card as unknown as Record<string, unknown>,
    };

    return normalized;
  }

  /**
   * Converts a normalized card back to Pokemon format
   * @param {NormalizedCard} card - The normalized card
   * @return {PokemonCard} The Pokemon card
   */
  static denormalize(card: NormalizedCard): PokemonCard {
    return card.rawData as unknown as PokemonCard;
  }
}
