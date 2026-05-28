import { database } from "../../database/jsonDatabase.js";

export async function validarCuenta(numeroCuenta) {
  const clientes = await database.clientes.findAll();
  const cliente = clientes.find((c) => c.numeroCuenta === numeroCuenta);

  if (!cliente) {
    return {
      exists: false,
      id: null,
      nombre: null,
      estado: "NO_ENCONTRADO",
    };
  }

  return {
    exists: true,
    id: cliente.id,
    nombre: cliente.nombre,
    estado: cliente.estado,
  };
}
