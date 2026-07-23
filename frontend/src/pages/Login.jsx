import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "@/services/authService.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, senha);
      toast.success("Bem-vindo!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const status = err?.response?.status;
      const msg =
        status === 401 || status === 400
          ? "E-mail ou senha inválidos."
          : getErrorMessage(err, "Não foi possível entrar.");
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-slate-200 p-8">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[#166534]">Sistema</p>
          <h1 className="text-2xl font-semibold text-[#0F172A] mt-1">Cemitério Digital</h1>
          <p className="mt-2 text-sm text-[#64748B]">Acesse sua conta para continuar.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="E-mail"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Senha"
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[#B91C1C]">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-[#64748B]">
          Não tem conta?{" "}
          <a href="/register" className="font-semibold text-[#166534] hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
