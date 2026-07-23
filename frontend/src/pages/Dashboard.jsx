import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardService } from "@/services/dashboardService.js";
import { getCurrentUser } from "@/services/authService.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Loading from "@/components/ui/Loading.jsx";
import ErrorMessage from "@/components/ui/ErrorMessage.jsx";
import {
  UserPlus,
  UserSquare2,
  Landmark,
  ClipboardList,
  FileBarChart2,
  ShieldCheck,
} from "lucide-react";

function Metric({ label, value, tone = "neutral" }) {
  const colors = {
    neutral: "text-[#0F172A]",
    success: "text-[#15803D]",
    warning: "text-[#D97706]",
    danger: "text-[#B91C1C]",
    primary: "text-[#166534]",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-[#64748B]">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${colors[tone]}`}>{value ?? "—"}</p>
    </div>
  );
}

function Quick({ to, icon: Icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-[#166534] hover:shadow-sm transition"
    >
      <div className="rounded-lg bg-[#BBF7D0] p-2 text-[#166534]">
        <Icon size={20} />
      </div>
      <span className="text-sm font-medium text-[#0F172A]">{label}</span>
    </Link>
  );
}

export default function Dashboard() {
  const user = getCurrentUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await dashboardService.get();
      setData(res || {});
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível carregar o painel."));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading />;

  const j = data?.jazigos || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#0F172A]">
          Olá{user?.nome ? `, ${user.nome}` : ""}.
        </h1>
        <p className="text-sm text-[#64748B]">Resumo geral do sistema.</p>
      </div>

      {error && <ErrorMessage message={error} onRetry={load} />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Metric label="Falecidos" value={data?.totalFalecidos ?? data?.falecidos} tone="primary" />
        <Metric label="Responsáveis" value={data?.totalResponsaveis ?? data?.responsaveis} />
        <Metric label="Sepultamentos" value={data?.totalSepultamentos ?? data?.sepultamentos} />
        <Metric label="Jazigos" value={data?.totalJazigos ?? data?.jazigos?.total} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Metric label="Jazigos livres" value={j.livres} tone="success" />
        <Metric label="Parcialmente ocupados" value={j.parcialmente_ocupado ?? j.parciais} tone="warning" />
        <Metric label="Lotados" value={j.lotados} tone="danger" />
      </div>

      <Card title="Acesso rápido">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Quick to="/falecidos/novo" icon={UserPlus} label="Cadastrar Falecido" />
          <Quick to="/responsaveis/novo" icon={UserSquare2} label="Cadastrar Responsável" />
          <Quick to="/jazigos/novo" icon={Landmark} label="Cadastrar Jazigo" />
          <Quick to="/sepultamentos/novo" icon={ClipboardList} label="Registrar Sepultamento" />
          <Quick to="/relatorios" icon={FileBarChart2} label="Relatórios" />
          {user?.cargo === "admin" && (
            <Quick to="/admin/usuarios" icon={ShieldCheck} label="Administração" />
          )}
        </div>
      </Card>
    </div>
  );
}
