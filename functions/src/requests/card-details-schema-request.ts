import { z } from "zod";
import { Brand } from "../enum/brand";

/**
 * HTTP function to fetch the card details based on the brand and
 * query parameters
 * @param {Request} request The HTTP request object
 * @param {Response} response The HTTP response object
 */
export const CardDetailsSchema = z.object({
  brand: z.enum(Brand).pipe(
    z.enum(Brand).catch(() => {
      throw new Error("Brand is required");
    }),
  ),
  setId: z.string().min(1, "Set ID is required"),
  name: z.string().min(1, "Name is required"),
  cardId: z.string().min(1, "Card ID is required"),
});

/**
 * Inferred type from CardDetailsSchema.
 * Use this type to ensure type safety when handling card details requests.
 */
export type CardDetailsRequestData = z.infer<typeof CardDetailsSchema>;
