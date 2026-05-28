import { database } from "../database/jsonDatabase.js";
import { compareHash } from "../utils/crypto.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireApiKey = asyncHandler(async (req, _res, next) => {
  const rawKey = req.headers["x-api-key"];

  if (!rawKey) {
    throw new AppError("Missing API Key.", 401, "MISSING_API_KEY");
  }

  const apiKeys = await database.apiKeys.findAll();
  const activeKeys = apiKeys.filter((k) => k.isActive);

  let matchedKey = null;
  for (const key of activeKeys) {
    const valid = await compareHash(rawKey, key.keyHash);
    if (valid) {
      matchedKey = key;
      break;
    }
  }

  if (!matchedKey) {
    throw new AppError("Invalid API Key.", 401, "INVALID_API_KEY");
  }

  matchedKey.lastUsedAt = new Date().toISOString();
  await database.apiKeys.saveAll(apiKeys);

  req.apiClient = {
    apiKeyId: matchedKey.id,
    name: matchedKey.name,
  };

  next();
});
