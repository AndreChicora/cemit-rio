export default function Select({ label, error, children, className = "", id, ...props }) {
  const selectId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-[#0F172A] mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#166534] focus:outline-none focus:ring-2 focus:ring-[#BBF7D0] ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-[#B91C1C]">{error}</p>}
    </div>
  );
}
