import crypto from "crypto";
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";

const SALT_ROUNDS = 10;

export function generatePlainApiKey() {
  const random = crypto.randomBytes(32).toString("hex");
  return `${env.API_KEY_PREFIX}_${random}`;
}

export async function hashValue(value) {
  return bcrypt.hash(value, SALT_ROUNDS);
}

export async function compareHash(value, hash) {
  return bcrypt.compare(value, hash);
}

export function getApiKeyPreview(apiKey) {
  const prefix = apiKey.slice(0, 10);
  const suffix = apiKey.slice(-6);
  return `${prefix}...${suffix}`;
}
