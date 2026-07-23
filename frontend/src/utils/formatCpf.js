export function formatCpf(value) {
  if (!value) return "—";
  const digits = String(value).replace(/\D/g, "").padStart(11, "0").slice(-11);
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}
