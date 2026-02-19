import { z } from "zod";
import { Brand } from "../enum/brand";

/**
 * HTTP function to fetch the card list based on the brand and query parameters
 * @param {Request} request The HTTP request object
 * @param {Response} response The HTTP response object
 */
export const CardListSchema = z.object({
  brand: z.enum(Object.values(Brand) as [string, ...string[]], {
    message: "Brand is required",
  }),
  name: z.string().nonoptional({ message: "Name is required" }),
  rarity: z.string().nonoptional({ message: "Rarity is required" }),
});

/**
 * Type definition for the card list request data, inferred from the
 * CardListSchema. This type will be used to ensure that the request data
 * adheres to the expected structure
 */
export type CardListRequestData = z.infer<typeof CardListSchema>;
