import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parseInt(process.env.PORT ?? "4000", 10),
  API_KEY_PREFIX: process.env.API_KEY_PREFIX ?? "ci_test",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};
