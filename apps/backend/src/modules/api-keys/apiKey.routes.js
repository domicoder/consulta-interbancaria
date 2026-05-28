import { Router } from "express";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { createApiKeySchema } from "./apiKey.schema.js";
import { postCreateApiKey } from "./apiKey.controller.js";

const router = Router();

router.post("/", validateBody(createApiKeySchema), postCreateApiKey);

export default router;
