export default function EmptyState({ title = "Nada por aqui", description, action }) {
  return (
    <div className="text-center py-16">
      <h3 className="text-lg font-semibold text-[#1E293B]">{title}</h3>
      {description && <p className="mt-2 text-sm text-[#64748B]">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
