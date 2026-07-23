import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { falecidoService } from "@/services/falecidoService.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";

export default function NovoFalecido() {
  const [form, setForm] = useState({
    nome: "",
    documento: "",
    nomeMae: "",
    naturalidade: "",
    dataNascimento: "",
    dataFalecimento: "",
    causaObito: "",
    observacoes: "",
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
    if (!form.nome || !form.documento || !form.dataNascimento || !form.dataFalecimento) {
      setError("Preencha os campos obrigatórios.");
      return;
    }
    setLoading(true);
    try {
      await falecidoService.create(form);
      toast.success("Falecido cadastrado com sucesso!");
      navigate("/falecidos");
    } catch (err) {
      const msg = getErrorMessage(err, "Erro ao cadastrar.");
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="Novo Falecido">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nome completo *" value={form.nome} onChange={(e) => update("nome", e.target.value)} required />
        <Input label="Documento *" value={form.documento} onChange={(e) => update("documento", e.target.value)} required />
        <Input label="Nome da mãe" value={form.nomeMae} onChange={(e) => update("nomeMae", e.target.value)} />
        <Input label="Naturalidade" value={form.naturalidade} onChange={(e) => update("naturalidade", e.target.value)} />
        <Input label="Data de nascimento *" type="date" value={form.dataNascimento} onChange={(e) => update("dataNascimento", e.target.value)} required />
        <Input label="Data de falecimento *" type="date" value={form.dataFalecimento} onChange={(e) => update("dataFalecimento", e.target.value)} required />
        <Input label="Causa do óbito" value={form.causaObito} onChange={(e) => update("causaObito", e.target.value)} />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#0F172A] mb-1">Observações</label>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#166534] focus:outline-none focus:ring-2 focus:ring-[#BBF7D0]"
            value={form.observacoes}
            onChange={(e) => update("observacoes", e.target.value)}
          />
        </div>
        {error && (
          <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[#B91C1C]">
            {error}
          </div>
        )}
        <div className="md:col-span-2 flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={() => navigate("/falecidos")}>
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
