import Button from "./Button.jsx";

export default function ConfirmModal({
  open,
  title = "Confirmar",
  description = "Tem certeza?",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-semibold text-[#0F172A]">{title}</h3>
        </div>
        <div className="p-5 text-sm text-[#334155]">{description}</div>
        <div className="flex justify-end gap-2 p-4 border-t border-slate-100">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Processando..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
