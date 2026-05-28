import express from "express";
import helmet from "helmet";
import cors from "cors";
import { pinoHttp } from "pino-http";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import apiRouter from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-api-key"],
  })
);

app.use(express.json({ limit: "1mb" }));

app.use(
  pinoHttp({
    logger,
    customLogLevel: (_req, res) => (res.statusCode >= 400 ? "warn" : "info"),
  })
);

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
    code: "RATE_LIMIT_EXCEEDED",
  },
});

app.use(generalLimiter);

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
