import { Brand } from "../enum/brand";
/**
 * API client for TCG service
 */
class ApiTcg {
  private baseUrl: string = process.env.TCG_SERVICE_BASE_URL || "";
  private apiKey: string = process.env.TCG_SERVICE_API_KEY || "";
  private headers: Record<string, string> = {};

  /**
   * Creates an instance of ApiTcg */
  constructor() {
    this.headers = {
      "x-api-key": `${this.apiKey}`,
      "Content-Type": "application/json",
    };
    console.log("API client initialized with base URL:", this.baseUrl);
  }

  /**
   * Fetches the list of brands from the TCG service
   * @return {Promise<Record<string, string>>} The brand list data
   */
  static async getBrandList(): Promise<Record<string, string>> {
    return new Promise((resolve) => {
      resolve(Brand);
    });
  }

  /**
   * Fetches the list of cards from the TCG service
   * @param {Brand} brand The brand to fetch cards for
   * @param {Record<string, string>} query The query parameters for
   * filtering cards
   * @return {Promise<Record<string, string>>} The card list data
   */
  async getCardList(
    brand: Brand,
    query: Record<string, string>,
  ): Promise<Record<string, string>> {
    const queryParams = new URLSearchParams(query).toString();
    const url = `https://${this.baseUrl}/api/${brand}/cards?name=${queryParams}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });
      if (!response.ok) {
        throw new Error(`Error fetching card list: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getCardList:", error);
      throw error;
    }
  }
}

export { ApiTcg };
