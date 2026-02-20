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
    response.json(Object.values(Brand));
  },
);

export const getCardDetails = onRequest(
  {
    cors: true,
    secrets: ["TCG_SERVICE_BASE_URL", "TCG_SERVICE_API_KEY"],
  },
  async (request, response) => {
    const { brand, setId, name, cardId } = request.body;

    // Validate required query parameters
    const missingParams: string[] = [];
    if (typeof brand !== "string") missingParams.push("brand");
    if (typeof setId !== "string") missingParams.push("setId");
    if (typeof name !== "string") missingParams.push("name");
    if (typeof cardId !== "string") missingParams.push("cardId");

    if (missingParams.length > 0) {
      const paramsList = missingParams.join(", ");
      const errorMessage = `Missing or invalid query parameters: ${paramsList}`;
      logger.error(errorMessage, { received: request.query });
      response.status(400).json({
        error: errorMessage,
        required: ["brand", "setId", "name", "cardId"],
        received: request.query,
      });
      return;
    }

    const service = new GitHubService();
    try {
      const cardDetails = await service.getCardDetails(
        brand as Brand,
        setId as string,
        name as string,
        cardId as string,
      );
      response.json(cardDetails);
    } catch (error) {
      logger.error("Error fetching card details:", error);
      response.status(500).send("Error fetching card details");
    }
  },
);
