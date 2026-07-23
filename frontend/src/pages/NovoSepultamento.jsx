import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { falecidoService } from "@/services/falecidoService.js";
import { jazigoService } from "@/services/jazigoService.js";
import { responsavelService } from "@/services/responsavelService.js";
import { sepultamentoService } from "@/services/sepultamentoService.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Select from "@/components/ui/Select.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import Loading from "@/components/ui/Loading.jsx";

export default function NovoSepultamento() {
  const [falecidos, setFalecidos] = useState([]);
  const [jazigos, setJazigos] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [form, setForm] = useState({
    falecidoId: "",
    jazigoId: "",
    responsavelId: "",
    dataSepultamento: "",
    observacoes: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const [f, j, r] = await Promise.all([
          falecidoService.list(),
          jazigoService.list(),
          responsavelService.list(),
        ]);
        const fList = Array.isArray(f) ? f : f?.items || [];
        const jList = Array.isArray(j) ? j : j?.items || [];
        const rList = Array.isArray(r) ? r : r?.items || [];
        setFalecidos(fList.filter((x) => x.ativo !== false));
        setJazigos(
          jList.filter(
            (x) => x.ativo !== false && x.status !== "lotado"
          )
        );
        setResponsaveis(rList.filter((x) => x.ativo !== false));
      } catch (err) {
        toast.error(getErrorMessage(err, "Erro ao carregar dados."));
      } finally {
        setLoadingData(false);
      }
    })();
  }, []);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.falecidoId || !form.jazigoId || !form.responsavelId || !form.dataSepultamento) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      await sepultamentoService.create(form);
      toast.success("Sepultamento registrado com sucesso!");
      navigate("/sepultamentos");
    } catch (err) {
      const msg = getErrorMessage(err, "Não foi possível registrar.");
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  if (loadingData) return <Loading />;

  return (
    <Card title="Novo Sepultamento">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Falecido *" value={form.falecidoId} onChange={(e) => update("falecidoId", e.target.value)} required>
          <option value="">Selecione...</option>
          {falecidos.map((f) => (
            <option key={f._id} value={f._id}>
              {f.nome} — {f.documento}
            </option>
          ))}
        </Select>
        <Select label="Jazigo *" value={form.jazigoId} onChange={(e) => update("jazigoId", e.target.value)} required>
          <option value="">Selecione...</option>
          {jazigos.map((j) => (
            <option key={j._id} value={j._id}>
              {j.numero} — Quadra {j.quadra} ({j.ocupacaoAtual}/{j.capacidade})
            </option>
          ))}
        </Select>
        <Select label="Responsável *" value={form.responsavelId} onChange={(e) => update("responsavelId", e.target.value)} required>
          <option value="">Selecione...</option>
          {responsaveis.map((r) => (
            <option key={r._id} value={r._id}>
              {r.nome}
            </option>
          ))}
        </Select>
        <Input label="Data do sepultamento *" type="date" value={form.dataSepultamento} onChange={(e) => update("dataSepultamento", e.target.value)} required />
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
          <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[#B91C1C]">{error}</div>
        )}
        <div className="md:col-span-2 flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={() => navigate("/sepultamentos")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Registrando..." : "Registrar"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
