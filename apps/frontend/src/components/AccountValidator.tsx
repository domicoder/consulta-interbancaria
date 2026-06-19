import { useState } from "react";
import { validarCuenta } from "../services/api";
import type { ClientData } from "../services/api";

export default function AccountValidator() {
  const [apiKey, setApiKey] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [result, setResult] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim() || !accountNumber.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await validarCuenta(accountNumber, apiKey);
      setResult(data.data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error al validar la cuenta";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const estadoBadge = (estado: string) => {
    const styles: Record<string, string> = {
      ACTIVA: "bg-emerald-100 text-emerald-800",
      INACTIVA: "bg-red-100 text-red-800",
      SUSPENDIDA: "bg-yellow-100 text-yellow-800",
    };
    return (
      styles[estado] || "bg-slate-100 text-slate-800"
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Validar Cuenta
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Verifica el estado de una cuenta bancaria
        </p>
      </div>

      <div className="px-6 py-5">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {result ? (
          <div className="space-y-5">
            <div
              className={`rounded-lg p-4 ${
                result.exists
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {result.exists ? (
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <span
                  className={`text-sm font-semibold ${
                    result.exists ? "text-emerald-800" : "text-red-800"
                  }`}
                >
                  {result.exists
                    ? "Cuenta encontrada"
                    : "Cuenta no encontrada"}
                </span>
              </div>
            </div>

            {result.exists && (
              <div className="divide-y divide-slate-100">
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-slate-500">ID Cliente</span>
                  <span className="text-sm font-mono font-medium text-slate-800">
                    {result.id}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-slate-500">Nombre</span>
                  <span className="text-sm font-medium text-slate-800">
                    {result.nombre}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-slate-500">Estado</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${estadoBadge(result.estado)}`}
                  >
                    {result.estado}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleReset}
              className="w-full px-4 py-2.5 border border-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
              type="button"
            >
              Validar otra cuenta
            </button>
          </div>
        ) : (
          <form onSubmit={handleValidate} className="space-y-4">
            <div>
              <label
                htmlFor="validateApiKey"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                API Key
              </label>
              <input
                id="validateApiKey"
                type="text"
                placeholder="Ingresa tu API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-slate-400"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Número de Cuenta
              </label>
              <input
                id="accountNumber"
                type="text"
                placeholder="Ej: 1234567890"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors placeholder-slate-400"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !apiKey.trim() || !accountNumber.trim()}
              className="w-full px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
                  Validando...
                </>
              ) : (
                "Validar Cuenta"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
