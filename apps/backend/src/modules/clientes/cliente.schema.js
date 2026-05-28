import { z } from "zod";

export const validarCuentaParamsSchema = z.object({
  numeroCuenta: z
    .string()
    .regex(/^\d{10,20}$/, {
      message: "numeroCuenta must contain only digits and be between 10 and 20 characters long.",
    }),
});
