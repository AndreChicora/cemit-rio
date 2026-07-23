const map = {
  success: "bg-[#BBF7D0] text-[#15803D]",
  danger: "bg-red-100 text-[#B91C1C]",
  warning: "bg-amber-100 text-[#D97706]",
  neutral: "bg-slate-100 text-slate-600",
  info: "bg-emerald-50 text-[#166534]",
};

export default function Badge({ variant = "neutral", children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[variant] || map.neutral}`}>
      {children}
    </span>
  );
}
