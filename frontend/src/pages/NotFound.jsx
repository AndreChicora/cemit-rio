import { Link } from "react-router-dom";
import Button from "@/components/ui/Button.jsx";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] p-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-[#166534]">404</p>
        <h1 className="mt-2 text-xl font-semibold text-[#0F172A]">Página não encontrada</h1>
        <p className="mt-1 text-sm text-[#64748B]">O endereço acessado não existe.</p>
        <div className="mt-6">
          <Link to="/dashboard">
            <Button>Voltar ao painel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
