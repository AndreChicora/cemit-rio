import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

const titles = {
  "/dashboard": "Painel Geral",
  "/falecidos": "Falecidos",
  "/falecidos/novo": "Novo Falecido",
  "/responsaveis": "Responsáveis",
  "/responsaveis/novo": "Novo Responsável",
  "/jazigos": "Jazigos",
  "/jazigos/novo": "Novo Jazigo",
  "/sepultamentos": "Sepultamentos",
  "/sepultamentos/novo": "Novo Sepultamento",
  "/relatorios": "Relatórios",
  "/admin/usuarios": "Administração de Usuários",
};

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  let title = titles[location.pathname] || "Cemitério Digital";
  if (location.pathname.startsWith("/falecidos/") && !titles[location.pathname])
    title = "Detalhes do Falecido";
  if (location.pathname.startsWith("/responsaveis/") && !titles[location.pathname])
    title = "Detalhes do Responsável";
  if (location.pathname.startsWith("/jazigos/") && !titles[location.pathname])
    title = "Detalhes do Jazigo";

  return (
    <div className="flex min-h-screen bg-[#F1F5F9]">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <Navbar title={title} onOpenMenu={() => setOpen(true)} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
