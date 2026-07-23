export function getErrorMessage(err, fallback = "Ocorreu um erro. Tente novamente.") {
  if (!err) return fallback;
  const data = err?.response?.data;
  if (typeof data === "string") return data;
  return data?.message || data?.error || err?.message || fallback;
}
