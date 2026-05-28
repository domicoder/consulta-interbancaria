import { z } from "zod";

export const createApiKeySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .default("Default API Key"),
});
