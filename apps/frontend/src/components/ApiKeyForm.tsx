import { useState } from "react";
import { crearApiKey } from "../services/api";
import type { ApiKeyData } from "../services/api";

interface CreateApiKeyResult {
  apiKey: ApiKeyData;
  plainApiKey: string;
}

export default function ApiKeyForm() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<CreateApiKeyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      const data = await crearApiKey(name);
      setResult(data.data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error al crear API key";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.plainApiKey) return;
    try {
      await navigator.clipboard.writeText(result.plainApiKey);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = result.plainApiKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewKey = () => {
    setResult(null);
    setName("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Generar API Key
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Crea una nueva llave de acceso para el servicio
        </p>
      </div>

      <div className="px-6 py-5">
        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="apiKeyName"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Nombre de la API Key
              </label>
              <input
                id="apiKeyName"
                type="text"
                placeholder="Ej: API Key Desarrollo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-slate-400"
                disabled={loading}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generando...
                </>
              ) : (
                "Generar API Key"
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-amber-600 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Guarda esta llave
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    No podrás volver a verla. Cópiala ahora y guárdala en un
                    lugar seguro.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                API Key
              </label>
              <div className="flex gap-2">
                <code className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono text-slate-800 break-all select-all">
                  {result.plainApiKey}
                </code>
                <button
                  onClick={handleCopy}
                  className="px-3 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shrink-0"
                  title="Copiar al portapapeles"
                  type="button"
                >
                  {copied ? (
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs text-slate-500">ID</p>
                <p className="text-sm font-mono text-slate-800 mt-0.5 break-all">
                  {result.apiKey.id}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Nombre</p>
                <p className="text-sm font-medium text-slate-800 mt-0.5">
                  {result.apiKey.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Preview</p>
                <p className="text-sm font-mono text-slate-800 mt-0.5">
                  {result.apiKey.keyPreview}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Creada</p>
                <p className="text-sm text-slate-800 mt-0.5">
                  {new Date(result.apiKey.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={handleNewKey}
              className="w-full px-4 py-2.5 border border-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
              type="button"
            >
              Generar otra API Key
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
