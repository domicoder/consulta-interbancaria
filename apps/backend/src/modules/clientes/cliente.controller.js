import { validarCuenta } from "./cliente.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getValidarCuenta = asyncHandler(async (req, res) => {
  const { numeroCuenta } = req.params;
  const result = await validarCuenta(numeroCuenta);

  res.status(200).json({
    success: true,
    data: result,
  });
});
