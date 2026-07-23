import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  Landmark,
  ClipboardList,
  FileBarChart2,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { getCurrentUser, logout } from "@/services/authService.js";
import { useNavigate } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Painel Geral", icon: LayoutDashboard },
  { to: "/falecidos", label: "Falecidos", icon: Users },
  { to: "/responsaveis", label: "Responsáveis", icon: UserSquare2 },
  { to: "/jazigos", label: "Jazigos", icon: Landmark },
  { to: "/sepultamentos", label: "Sepultamentos", icon: ClipboardList },
  { to: "/relatorios", label: "Relatórios", icon: FileBarChart2 },
];

export default function Sidebar({ onNavigate }) {
  const user = getCurrentUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-[#166534] text-white"
        : "text-slate-200 hover:bg-[#0f2c1c] hover:text-white"
    }`;

  return (
    <aside className="flex h-full w-64 flex-col bg-[#1E293B] text-white">
      <div className="px-5 py-6 border-b border-white/10">
        <p className="text-xs uppercase tracking-widest text-[#BBF7D0]">Sistema</p>
        <h1 className="text-lg font-semibold">Cemitério Digital</h1>
      </div>
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {items.map((i) => (
          <NavLink key={i.to} to={i.to} className={linkClass} onClick={onNavigate}>
            <i.icon size={18} />
            <span>{i.label}</span>
          </NavLink>
        ))}
        {user?.cargo === "admin" && (
          <NavLink to="/admin/usuarios" className={linkClass} onClick={onNavigate}>
            <ShieldCheck size={18} />
            <span>Administração</span>
          </NavLink>
        )}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-[#0f2c1c] hover:text-white"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}
