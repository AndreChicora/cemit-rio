import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { responsavelService } from "@/services/responsavelService.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";

export default function NovoResponsavel() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: "",
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
    if (!form.nome || !form.cpf) {
      setError("Preencha os campos obrigatórios.");
      return;
    }
    setLoading(true);
    try {
      await responsavelService.create(form);
      toast.success("Responsável cadastrado!");
      navigate("/responsaveis");
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="Novo Responsável Legal">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nome completo *" value={form.nome} onChange={(e) => update("nome", e.target.value)} required />
        <Input label="CPF *" value={form.cpf} onChange={(e) => update("cpf", e.target.value)} required />
        <Input label="Telefone" value={form.telefone} onChange={(e) => update("telefone", e.target.value)} />
        <Input label="E-mail" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        <div className="md:col-span-2">
          <Input label="Endereço" value={form.endereco} onChange={(e) => update("endereco", e.target.value)} />
        </div>
        {error && (
          <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[#B91C1C]">{error}</div>
        )}
        <div className="md:col-span-2 flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={() => navigate("/responsaveis")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
