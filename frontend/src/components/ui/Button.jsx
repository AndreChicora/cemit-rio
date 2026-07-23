export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed";
  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };
  const variants = {
    primary:
      "bg-[#166534] text-white hover:bg-[#15803D] focus:ring-[#166534]",
    secondary:
      "bg-white text-[#0F172A] border border-slate-300 hover:bg-slate-50 focus:ring-slate-400",
    danger: "bg-[#B91C1C] text-white hover:bg-red-800 focus:ring-red-700",
    ghost: "bg-transparent text-[#0F172A] hover:bg-slate-100",
  };
  return (
    <button
      type={type}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
