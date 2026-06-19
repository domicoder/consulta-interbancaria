const API_URL = "http://localhost:4000/api";

export interface ApiKeyData {
  id: string;
  name: string;
  keyPreview: string;
  createdAt: string;
}

export interface CreateApiKeyResponse {
  success: boolean;
  message: string;
  data: {
    apiKey: ApiKeyData;
    plainApiKey: string;
  };
}

export interface ClientData {
  exists: boolean;
  id: string;
  nombre: string;
  estado: string;
}

export interface ValidateAccountResponse {
  success: boolean;
  data: ClientData;
}

export async function crearApiKey(name: string): Promise<CreateApiKeyResponse> {
  const response = await fetch(`${API_URL}/api-keys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al crear API key");
  }

  return response.json();
}

export async function validarCuenta(
  numeroCuenta: string,
  apiKey: string
): Promise<ValidateAccountResponse> {
  const response = await fetch(
    `${API_URL}/clientes/validar-cuenta/${numeroCuenta}`,
    {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al validar la cuenta");
  }

  return response.json();
}
