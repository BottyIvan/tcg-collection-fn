/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { ZodError } from "zod";
import { ApiTcg } from "./services/apitcg";
import {
  CardListRequestData,
  CardListSchema,
} from "./requests/card-list-request";
import { Brand } from "./enum/brand";
import { GitHubService } from "./services/github";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

/**
 * HTTP function to respond with a simple greeting message
 * @param {Request} request The HTTP request object
 * @param {Response} response The HTTP response object
 */
export const helloWorld = onRequest({ cors: true }, (_request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

/**
 * HTTP function to fetch the brand list from the TCG service
 * @param {Request} request The HTTP request object
 * @param {Response} response The HTTP response object
 */
export const brandList = onRequest(
  { cors: true },
  async (request, response) => {
    // Calling the API client to fetch the brand list
    try {
      const brandList = await ApiTcg.getBrandList();
      response.json(brandList);
    } catch (error) {
      logger.error("Error fetching brand list:", error);
      response.status(500).send("Error fetching brand list");
    }
  },
);

/**
 * HTTP function to fetch the set list based on the brand query parameter
 * @param {Request} request The HTTP request object
 * @param {Response} response The HTTP response object
 */
export const setList = onRequest(
  {
    cors: true,
    secrets: ["TCG_SERVICE_BASE_URL", "TCG_SERVICE_API_KEY"],
  },
  async (request, response) => {
    // TODO: Implement SetListSchema and validation logic for now
    // keeping it simple like only Pokemon
    const service = new GitHubService();
    try {
      const setsResponse = await service.getSets(Brand.Pokemon);
      const setsData = await setsResponse.json();
      response.json(setsData);
    } catch (error) {
      logger.error("Error fetching set list:", error);
      response.status(500).send("Error fetching set list");
    }
  },
);

/**
 * HTTP function to fetch the card list based on the brand and query parameters
 * @param {Request} request The HTTP request object
 * @param {Response} response The HTTP response object
 */
export const cardList = onRequest(
  {
    cors: true,
    secrets: ["TCG_SERVICE_BASE_URL", "TCG_SERVICE_API_KEY"],
  },
  async (request, response) => {
    // Validating the request body against the CardListSchema
    let parsed: CardListRequestData;
    try {
      parsed = CardListSchema.parse(request.body);
    } catch (error) {
      if (error instanceof ZodError) {
        logger.error("Validation error:", error);
        response.status(400).json({ error: error.issues });
        return;
      }
      logger.error("Unexpected error during validation:", error);
      response.status(500).send("Unexpected error during validation");
      return;
    }

    // Calling the API client to fetch the card list
    try {
      const apiClient = new ApiTcg();
      const cardList = await apiClient.getCardList(parsed.brand as Brand, {
        name: parsed.name as string,
      });
      response.json(cardList);
    } catch (error) {
      logger.error("Error fetching card list:", error);
      response.status(500).send("Error fetching card list");
    }
  },
);
