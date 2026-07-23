export default function Card({ children, className = "", title, actions }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          {title && <h3 className="text-base font-semibold text-[#0F172A]">{title}</h3>}
          {actions}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
