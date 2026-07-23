import { Menu } from "lucide-react";
import { getCurrentUser } from "@/services/authService.js";

export default function Navbar({ title, onOpenMenu }) {
  const user = getCurrentUser();
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-lg md:text-xl font-semibold text-[#0F172A]">{title}</h2>
      </div>
      {user && (
        <div className="text-right">
          <p className="text-sm font-medium text-[#0F172A]">{user.nome}</p>
          <p className="text-xs text-[#64748B] capitalize">{user.cargo || "usuário"}</p>
        </div>
      )}
    </header>
  );
}
