import { Brand } from "../enum/brand";
import { NormalizedCard, CardCost } from "../interface/card";
import { DragonBallCard } from "../interface/card/dragonball";

/**
 * Adapter for normalizing Dragon Ball Fusion TCG cards
 */
export class DragonBallCardAdapter {
  /**
   * Converts a Dragon Ball card to the normalized format
   * @param {DragonBallCard} card - The Dragon Ball card to normalize
   * @return {NormalizedCard} The normalized card
   */
  static normalize(card: DragonBallCard): NormalizedCard {
    const costs: CardCost[] = [];

    // Add play cost
    if (card.cost && card.cost !== "-") {
      costs.push({
        type: "play",
        value: card.cost,
      });
    }

    // Add specified cost
    if (card.specifiedCost && card.specifiedCost !== "-") {
      costs.push({
        type: "specified",
        value: card.specifiedCost,
      });
    }

    // Add combo power as combo cost
    if (card.comboPower && card.comboPower !== "-") {
      costs.push({
        type: "combo",
        value: card.comboPower,
      });
    }

    // Parse features into subtypes
    const subtypes: string[] = [];
    if (card.features && card.features !== "-") {
      // Features are typically in format "Type1/Type2/Type3"
      subtypes.push(...card.features.split("/").map((f: string) => f.trim()));
    }

    // Parse color
    const colors: string[] = [];
    if (card.color && card.color !== "-") {
      colors.push(card.color);
    }

    const normalized: NormalizedCard = {
      id: card.id,
      code: card.code,
      name: card.name,
      brand: Brand.DragonBallFusion,
      cardType: card.cardType,
      subtypes: subtypes.length > 0 ? subtypes : undefined,
      power: card.power && card.power !== "-" ? card.power : undefined,
      rarity: card.rarity,
      images: card.images,
      set: card.set,
      costs: costs.length > 0 ? costs : undefined,
      colors: colors.length > 0 ? colors : undefined,
      effect: card.effect && card.effect !== "-" ? card.effect : undefined,
      rawData: card as unknown as Record<string, unknown>,
    };

    return normalized;
  }

  /**
   * Converts a normalized card back to Dragon Ball format
   * @param {NormalizedCard} card - The normalized card
   * @return {DragonBallCard} The Dragon Ball card
   */
  static denormalize(card: NormalizedCard): DragonBallCard {
    return card.rawData as unknown as DragonBallCard;
  }
}
