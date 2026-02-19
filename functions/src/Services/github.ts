import { TCG_CONFIG } from "../config/tcg-config";
import { Brand } from "../enum/brand";

/**
 * Service to relay data from GitHub directly.
 */
class GitHubService {
  /**
   * Initializes a new instance of GitHubService.
   */
  constructor() {
    console.log("GitHubService initialized");
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
}

export { GitHubService };
