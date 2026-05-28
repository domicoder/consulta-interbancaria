import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../../data");

const API_KEYS_FILE = join(DATA_DIR, "api-keys.json");
const CLIENTES_FILE = join(DATA_DIR, "clientes.json");

async function readJson(filePath) {
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

async function writeJson(filePath, data) {
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export const database = {
  apiKeys: {
    findAll: () => readJson(API_KEYS_FILE),
    saveAll: (apiKeys) => writeJson(API_KEYS_FILE, apiKeys),
  },
  clientes: {
    findAll: () => readJson(CLIENTES_FILE),
    saveAll: (clientes) => writeJson(CLIENTES_FILE, clientes),
  },
};
