import { Router } from "express";
import { requireApiKey } from "../../middlewares/apiKey.middleware.js";
import { validateParams } from "../../middlewares/validate.middleware.js";
import { validarCuentaParamsSchema } from "./cliente.schema.js";
import { getValidarCuenta } from "./cliente.controller.js";

const router = Router();

router.get(
  "/validar-cuenta/:numeroCuenta",
  requireApiKey,
  validateParams(validarCuentaParamsSchema),
  getValidarCuenta
);

export default router;
