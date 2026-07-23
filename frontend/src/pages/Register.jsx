import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { register, getCurrentUser } from "@/services/authService.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";

export default function Register() {
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.cargo === "admin";
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cargo: "operador",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.nome || !form.email || !form.senha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      };
      if (isAdmin) payload.cargo = form.cargo;
      await register(payload);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      const msg = getErrorMessage(err, "Não foi possível concluir o cadastro.");
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-slate-200 p-8">
        <h1 className="text-2xl font-semibold text-[#0F172A]">Novo usuário</h1>
        <p className="mt-1 text-sm text-[#64748B]">Crie sua conta para acessar o sistema.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input label="Nome completo" value={form.nome} onChange={(e) => update("nome", e.target.value)} required />
          <Input label="E-mail" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          <Input label="Senha" type="password" value={form.senha} onChange={(e) => update("senha", e.target.value)} required />
          <Input
            label="Confirmar senha"
            type="password"
            value={form.confirmarSenha}
            onChange={(e) => update("confirmarSenha", e.target.value)}
            required
          />
          {isAdmin && (
            <Select label="Cargo" value={form.cargo} onChange={(e) => update("cargo", e.target.value)}>
              <option value="operador">Operador</option>
              <option value="admin">Administrador</option>
            </Select>
          )}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[#B91C1C]">{error}</div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-[#64748B]">
          Já tem conta?{" "}
          <a href="/login" className="font-semibold text-[#166534] hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
