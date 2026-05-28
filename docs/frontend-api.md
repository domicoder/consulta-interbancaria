# Frontend API Reference – Consulta Interbancaria

Base URL: `http://localhost:4000`

---

## Autenticación

Los endpoints protegidos requieren enviar la API Key en el header:

```
x-api-key: <tu-api-key>
```

---

## 1. Health Check

Verifica que el servicio esté activo.

**Request**

```
GET /api/health
```

**Response `200`**

```json
{
  "success": true,
  "message": "Consulta Interbancaria API is running"
}
```

**cURL**

```bash
curl http://localhost:4000/api/health
```

---

## 2. Crear API Key

Genera una nueva API Key. **Guarda la clave devuelta; no se mostrará de nuevo.**

**Request**

```
POST /api/api-keys
Content-Type: application/json
```

**Body** (opcional)

```json
{
  "name": "API Key Desarrollo"
}
```

> Si no se envía `name`, se usará `"Default API Key"`.

**Response `201`**

```json
{
  "success": true,
  "message": "API Key created successfully. Save it now. It will not be shown again.",
  "data": {
    "apiKey": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "API Key Desarrollo",
      "keyPreview": "ci_test_ab...cdef12",
      "createdAt": "2026-05-28T00:00:00.000Z"
    },
    "plainApiKey": "ci_test_abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
  }
}
```

**cURL**

```bash
curl -X POST http://localhost:4000/api/api-keys \
  -H "Content-Type: application/json" \
  -d '{"name": "API Key Desarrollo"}'
```

---

## 3. Validar Cuenta Bancaria

Verifica si un número de cuenta existe en el sistema.

**Request**

```
GET /api/clientes/validar-cuenta/:numeroCuenta
x-api-key: <tu-api-key>
```

| Parámetro       | Tipo   | Reglas                                    |
|-----------------|--------|-------------------------------------------|
| `numeroCuenta`  | string | Solo dígitos, entre 10 y 20 caracteres.   |

**Response `200` – Cuenta encontrada**

```json
{
  "success": true,
  "data": {
    "exists": true,
    "id": "cli_001",
    "nombre": "Juan Pérez",
    "estado": "ACTIVA"
  }
}
```

**Response `200` – Cuenta no encontrada**

```json
{
  "success": true,
  "data": {
    "exists": false,
    "id": null,
    "nombre": null,
    "estado": "NO_ENCONTRADO"
  }
}
```

**cURL**

```bash
curl http://localhost:4000/api/clientes/validar-cuenta/1234567890 \
  -H "x-api-key: ci_test_abcdef..."
```

---

## 4. Posibles errores

Todos los errores siguen el mismo formato:

```json
{
  "success": false,
  "message": "Descripción del error.",
  "code": "CODIGO_ERROR"
}
```

| Código                  | HTTP | Descripción                                          |
|-------------------------|------|------------------------------------------------------|
| `MISSING_API_KEY`       | 401  | No se envió el header `x-api-key`.                   |
| `INVALID_API_KEY`       | 401  | La API Key enviada no es válida o está inactiva.     |
| `VALIDATION_ERROR`      | 422  | Los datos enviados no pasan la validación.           |
| `NOT_FOUND`             | 404  | La ruta solicitada no existe.                        |
| `RATE_LIMIT_EXCEEDED`   | 429  | Se superó el límite de 100 peticiones / 15 minutos. |
| `INTERNAL_SERVER_ERROR` | 500  | Error inesperado en el servidor.                     |

---

## Estados de cuenta

| Estado          | Significado                          |
|-----------------|--------------------------------------|
| `ACTIVA`        | Cuenta operativa.                    |
| `BLOQUEADA`     | Cuenta bloqueada temporalmente.      |
| `INACTIVA`      | Cuenta inactiva/cerrada.             |
| `NO_ENCONTRADO` | El número de cuenta no existe.       |
