import { Brand } from "../enum/brand";
import {
  NormalizedCard,
  DigimonCard,
  CardCost,
} from "../interface/card";

/**
 * Adapter for normalizing Digimon TCG cards
 */
export class DigimonCardAdapter {
  /**
   * Converts a Digimon card to the normalized format
   * @param {DigimonCard} card - The Digimon card to normalize
   * @return {NormalizedCard} The normalized card
   */
  static normalize(card: DigimonCard): NormalizedCard {
    const costs: CardCost[] = [];

    // Add play cost
    if (card.playCost && card.playCost !== "-") {
      costs.push({
        type: "play",
        value: card.playCost,
      });
    }

    // Add digivolve costs
    if (card.digivolveCost1 && card.digivolveCost1 !== "-") {
      costs.push({
        type: "evolve",
        value: card.digivolveCost1,
        name: "Digivolve 1",
      });
    }

    if (card.digivolveCost2 && card.digivolveCost2 !== "-") {
      costs.push({
        type: "evolve",
        value: card.digivolveCost2,
        name: "Digivolve 2",
      });
    }

    // Build subtypes from form and type
    const subtypes: string[] = [];
    if (card.form && card.form !== "-") {
      subtypes.push(card.form);
    }
    if (card.type && card.type !== "-") {
      subtypes.push(card.type);
    }

    // Build effect text
    const effectParts: string[] = [];
    if (card.effect && card.effect !== "-") {
      effectParts.push(`Effect: ${card.effect}`);
    }
    if (card.inheritedEffect && card.inheritedEffect !== "-") {
      effectParts.push(`Inherited: ${card.inheritedEffect}`);
    }
    if (card.securityEffect && card.securityEffect !== "-") {
      effectParts.push(`Security: ${card.securityEffect}`);
    }

    const normalized: NormalizedCard = {
      id: card.id,
      code: card.code,
      name: card.name,
      brand: Brand.Digimon,
      cardType: card.cardType,
      subtypes: subtypes.length > 0 ? subtypes : undefined,
      power: card.dp && card.dp !== "-" ? card.dp : undefined,
      rarity: card.rarity,
      images: card.images,
      set: card.set,
      costs: costs.length > 0 ? costs : undefined,
      colors: card.colors,
      level: card.level,
      effect: effectParts.length > 0 ? effectParts.join("\n") : undefined,
      rawData: card as unknown as Record<string, unknown>,
    };

    return normalized;
  }

  /**
   * Converts a normalized card back to Digimon format
   * @param {NormalizedCard} card - The normalized card
   * @return {DigimonCard} The Digimon card
   */
  static denormalize(card: NormalizedCard): DigimonCard {
    return card.rawData as unknown as DigimonCard;
  }
}
