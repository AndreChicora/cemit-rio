import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { jazigoService } from "@/services/jazigoService.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";
import Button from "@/components/ui/Button.jsx";

export default function NovoJazigo() {
  const [form, setForm] = useState({
    numero: "",
    quadra: "",
    capacidade: 1,
    ocupacaoAtual: 0,
    status: "livre",
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
    if (!form.numero || !form.quadra || !form.capacidade) {
      setError("Preencha os campos obrigatórios.");
      return;
    }
    setLoading(true);
    try {
      await jazigoService.create({
        ...form,
        capacidade: Number(form.capacidade),
        ocupacaoAtual: Number(form.ocupacaoAtual),
      });
      toast.success("Jazigo cadastrado!");
      navigate("/jazigos");
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="Novo Jazigo">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Número *" value={form.numero} onChange={(e) => update("numero", e.target.value)} required />
        <Input label="Quadra *" value={form.quadra} onChange={(e) => update("quadra", e.target.value)} required />
        <Input label="Capacidade *" type="number" min={1} value={form.capacidade} onChange={(e) => update("capacidade", e.target.value)} required />
        <Input label="Ocupação atual" type="number" min={0} value={form.ocupacaoAtual} onChange={(e) => update("ocupacaoAtual", e.target.value)} />
        <Select label="Status" value={form.status} onChange={(e) => update("status", e.target.value)}>
          <option value="livre">Livre</option>
          <option value="parcialmente_ocupado">Parcialmente ocupado</option>
          <option value="lotado">Lotado</option>
        </Select>
        {error && (
          <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[#B91C1C]">{error}</div>
        )}
        <div className="md:col-span-2 flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={() => navigate("/jazigos")}>
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
