import { Router } from "express";
import apiKeyRoutes from "../modules/api-keys/apiKey.routes.js";
import clienteRoutes from "../modules/clientes/cliente.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Consulta Interbancaria API is running",
  });
});

router.use("/api-keys", apiKeyRoutes);
router.use("/clientes", clienteRoutes);

export default router;
