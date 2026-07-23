import { useState } from "react";
import { toast } from "sonner";
import { relatorioService } from "@/services/dashboardService.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Select from "@/components/ui/Select.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import Table from "@/components/ui/Table.jsx";
import Loading from "@/components/ui/Loading.jsx";
import EmptyState from "@/components/ui/EmptyState.jsx";
import { formatDate } from "@/utils/formatDate.js";
import { formatCpf } from "@/utils/formatCpf.js";

const colunas = {
  falecidos: [
    { key: "nome", label: "Nome" },
    { key: "documento", label: "Documento" },
    { key: "dataFalecimento", label: "Falecimento", render: (r) => formatDate(r.dataFalecimento, false) },
  ],
  jazigos: [
    { key: "numero", label: "Número" },
    { key: "quadra", label: "Quadra" },
    { key: "capacidade", label: "Capacidade" },
    { key: "ocupacaoAtual", label: "Ocupação" },
    { key: "status", label: "Situação" },
  ],
  sepultamentos: [
    { key: "falecidoId", label: "Falecido" },
    { key: "jazigoId", label: "Jazigo" },
    { key: "responsavelId", label: "Responsável" },
    { key: "dataSepultamento", label: "Data", render: (r) => formatDate(r.dataSepultamento) },
  ],
};

export default function Relatorios() {
  const [tipo, setTipo] = useState("falecidos");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [situacao, setSituacao] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);

  async function gerar(e) {
    e?.preventDefault();
    setLoading(true);
    setRan(true);
    try {
      const params = {};
      if (inicio) params.dataInicio = inicio;
      if (fim) params.dataFim = fim;
      if (tipo === "jazigos" && situacao) params.status = situacao;
      const data = await relatorioService[tipo](params);
      setItems(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      toast.error(getErrorMessage(err, "Erro ao gerar relatório."));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card title="Filtros">
        <form onSubmit={gerar} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select label="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="falecidos">Falecidos</option>
            <option value="jazigos">Jazigos</option>
            <option value="sepultamentos">Sepultamentos</option>
          </Select>
          <Input label="Início" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
          <Input label="Fim" type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
          {tipo === "jazigos" && (
            <Select label="Situação" value={situacao} onChange={(e) => setSituacao(e.target.value)}>
              <option value="">Todas</option>
              <option value="livre">Livre</option>
              <option value="parcialmente_ocupado">Parcialmente ocupado</option>
              <option value="lotado">Lotado</option>
            </Select>
          )}
          <div className="md:col-span-4 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Gerando..." : "Gerar relatório"}
            </Button>
          </div>
        </form>
      </Card>

      <Card title="Resultado">
        {loading ? (
          <Loading />
        ) : !ran ? (
          <EmptyState title="Configure os filtros e gere um relatório." />
        ) : items.length === 0 ? (
          <EmptyState title="Nenhum resultado encontrado." />
        ) : (
          <Table columns={colunas[tipo]} data={items} />
        )}
      </Card>
    </div>
  );
}
