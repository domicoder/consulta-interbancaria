import { v4 as uuidv4 } from "uuid";
import { database } from "../../database/jsonDatabase.js";
import {
  generatePlainApiKey,
  hashValue,
  getApiKeyPreview,
} from "../../utils/crypto.js";

export async function createApiKey({ name }) {
  const apiKeys = await database.apiKeys.findAll();

  const plainApiKey = generatePlainApiKey();
  const keyHash = await hashValue(plainApiKey);
  const keyPreview = getApiKeyPreview(plainApiKey);
  const now = new Date().toISOString();

  const newKey = {
    id: uuidv4(),
    name,
    keyHash,
    keyPreview,
    isActive: true,
    lastUsedAt: null,
    createdAt: now,
    revokedAt: null,
  };

  apiKeys.push(newKey);
  await database.apiKeys.saveAll(apiKeys);

  const { keyHash: _hash, ...metadata } = newKey;

  return { metadata, plainApiKey };
}
