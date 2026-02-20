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
import { Brand, SUPPORTED_BRANDS } from "./enum/brand";
import { CardDetailsRequestData } from "./requests/card-details-schema-request";
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
    // Return only the currently supported brands with implemented adapters
    response.json(SUPPORTED_BRANDS);
  },
);

export const getCardDetails = onRequest(
  {
    cors: true,
    secrets: ["TCG_SERVICE_BASE_URL", "TCG_SERVICE_API_KEY"],
  },
  async (request, response) => {
    // Create an instance of the GitHubService to interact with the TCG service
    const service = new GitHubService();
    try {
      // Validate and parse the request body using the CardDetailsSchema
      const data = request.body as CardDetailsRequestData;

      // Fetch the card details from the TCG service using the parsed data
      const cardDetails = await service.getCardDetails(
        data.brand as Brand,
        data.setId as string,
        data.name as string,
        data.cardId as string,
      );

      // Respond with the fetched card details
      response.json(cardDetails);
    } catch (error) {
      logger.error("Error fetching card details:", error);
      response.status(500).send("Error fetching card details");
    }
  },
);
