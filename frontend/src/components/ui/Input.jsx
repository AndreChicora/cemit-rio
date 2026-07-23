export default function Input({ label, error, className = "", id, ...props }) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[#0F172A] mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#166534] focus:outline-none focus:ring-2 focus:ring-[#BBF7D0] ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-[#B91C1C]">{error}</p>}
    </div>
  );
}
