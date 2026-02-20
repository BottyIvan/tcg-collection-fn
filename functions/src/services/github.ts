import { TCG_CONFIG } from "../config/tcg-config";
import { Brand } from "../enum/brand";
import { AnyTCGCard, NormalizedCard } from "../interface/card";
import { CardNormalizer } from "./card-normalizer";

/**
 * Service to relay data from GitHub directly.
 */
class GitHubService {
  cardNormalizer: CardNormalizer;
  /**
   * Initializes a new instance of GitHubService.
   */
  constructor() {
    console.log("GitHubService initialized");
    this.cardNormalizer = new CardNormalizer();
  }

  /**
   * Fetches the sets for a given brand from GitHub.
   * @param {Brand} brand The brand for which to fetch the sets
   * @return {Promise<Response>} A promise that resolves to the response
   */
  async getSets(brand: Brand): Promise<Response> {
    const tcgConfig = TCG_CONFIG[brand];
    if (!tcgConfig) {
      throw new Error(`Configuration for brand ${brand} not found`);
    }

    const url = new URL(tcgConfig.setsPath, tcgConfig.baseUrl).toString();
    const request = await fetch(url);
    if (!request.ok) {
      throw new Error(
        `Failed to fetch sets for brand ${brand}: ${request.statusText}`,
      );
    }
    return request;
  }

  /**
   * Fetches the cards for a given set from GitHub.
   * @param {Brand} brand The brand for which to fetch the cards
   * @param {string} setId The ID of the set for which to fetch the cards
   * @return {Promise<Response>} A promise that resolves to the cards data
   */
  async getCards(brand: Brand, setId: string): Promise<Response> {
    const config = TCG_CONFIG[brand];
    if (!config) throw new Error("Brand not supported");

    const url = new URL(config.cardsPath(setId), config.baseUrl).toString();
    const request = await fetch(url);
    if (!request.ok) {
      throw new Error(
        `Failed to fetch cards for brand ${brand} and set ${setId}: ` +
          `${request.statusText}`,
      );
    }
    return request;
  }

  /**
   * Fetches the details of a specific card from GitHub.
   * @param {Brand} brand The brand for which to fetch the card details
   * @param {string} setId The ID of the set containing the card
   * @param {string} name The name of the card for which to fetch details
   * @param {string} cardId The ID of the card for which to fetch details
   * @return {Promise<Response>} A promise that resolves to the card details
   */
  async getCardDetails(
    brand: Brand,
    setId: string,
    name: string,
    cardId: string,
  ): Promise<NormalizedCard> {
    const cards = await this.getCards(brand, setId);
    if (!cards.ok) {
      throw new Error(
        `Failed to fetch cards for brand ${brand} and set ${setId}: ` +
          `${cards.statusText}`,
      );
    }
    const cardsData: AnyTCGCard[] = await cards.json();
    const normalized = CardNormalizer.normalizeMany(cardsData, brand);
    const card = normalized.find(
      (card) => card.id === cardId || card.name === name,
    );

    if (!card) {
      throw new Error(
        `Card ${cardId} not found in set ${setId} for brand ${brand}`,
      );
    }
    return card;
  }
}

export { GitHubService };
