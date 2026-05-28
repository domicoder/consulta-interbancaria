# Consulta Interbancaria

API de consulta interbancaria construida con Node.js y Express. Permite validar cuentas bancarias simuladas a través de una API Key.

> **Nota importante:** Este proyecto usa archivos JSON locales como almacenamiento temporal. No utiliza ninguna base de datos real (PostgreSQL, MySQL, MongoDB, etc.). Es una base pre-producción de carácter académico.

---

## Requisitos

- Node.js v22.14.0
- npm v11.5.2

---

## Instalación

```bash
# Desde la raíz del monorepo
npm install
```

---

## Correr el backend

```bash
# Modo desarrollo (con hot-reload)
npm run dev:backend

# Modo producción
npm run start:backend
```

El servidor queda disponible en `http://localhost:4000`.

---

## Endpoints disponibles

| Método | Ruta                                          | Autenticación | Descripción                          |
|--------|-----------------------------------------------|---------------|--------------------------------------|
| GET    | `/api/health`                                 | No            | Estado del servicio                  |
| POST   | `/api/api-keys`                               | No            | Crear una nueva API Key              |
| GET    | `/api/clientes/validar-cuenta/:numeroCuenta`  | `x-api-key`   | Validar existencia de cuenta bancaria|

Consulta [`docs/frontend-api.md`](./docs/frontend-api.md) para ejemplos detallados de consumo.

---

## Estructura del monorepo

```
consulta-interbancaria/
├── apps/
│   ├── backend/    ← API Express (activo)
│   └── frontend/   ← Se agregará posteriormente
├── docs/
│   └── frontend-api.md
├── package.json
└── README.md
```

---

## Variables de entorno

Copia el archivo de ejemplo y ajusta los valores:

```bash
cp apps/backend/.env.example apps/backend/.env
```
