export default function Loading({ label = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-[#64748B]">
      <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-[#166534] animate-spin" />
      <p className="mt-3 text-sm">{label}</p>
    </div>
  );
}
