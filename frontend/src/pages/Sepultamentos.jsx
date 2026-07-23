import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sepultamentoService } from "@/services/sepultamentoService.js";
import { formatDate } from "@/utils/formatDate.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Table from "@/components/ui/Table.jsx";
import Button from "@/components/ui/Button.jsx";
import Badge from "@/components/ui/Badge.jsx";
import Loading from "@/components/ui/Loading.jsx";
import ErrorMessage from "@/components/ui/ErrorMessage.jsx";
import EmptyState from "@/components/ui/EmptyState.jsx";
import ConfirmModal from "@/components/ui/ConfirmModal.jsx";
import { Plus, Archive } from "lucide-react";

export default function Sepultamentos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [removing, setRemoving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await sepultamentoService.list();
      setItems(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleArchive() {
    setRemoving(true);
    try {
      await sepultamentoService.remove(confirmId);
      toast.success("Sepultamento arquivado.");
      setConfirmId(null);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setRemoving(false);
    }
  }

  const columns = [
    { key: "falecidoId", label: "Falecido" },
    { key: "jazigoId", label: "Jazigo" },
    { key: "responsavelId", label: "Responsável" },
    {
      key: "dataSepultamento",
      label: "Data",
      render: (r) => formatDate(r.dataSepultamento),
    },
    {
      key: "status",
      label: "Status",
      render: (r) =>
        r.status === "ativo" ? (
          <Badge variant="success">Ativo</Badge>
        ) : (
          <Badge>{r.status || "—"}</Badge>
        ),
    },
    {
      key: "acoes",
      label: "Ações",
      render: (r) => (
        <Button size="sm" variant="danger" onClick={() => setConfirmId(r._id)}>
          <Archive size={14} /> Arquivar
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Card
        title="Sepultamentos"
        actions={
          <Link to="/sepultamentos/novo">
            <Button>
              <Plus size={16} /> Novo
            </Button>
          </Link>
        }
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={load} />
        ) : items.length === 0 ? (
          <EmptyState title="Nenhum sepultamento registrado" />
        ) : (
          <Table columns={columns} data={items} />
        )}
      </Card>

      <ConfirmModal
        open={!!confirmId}
        title="Arquivar sepultamento"
        description="Deseja arquivar este sepultamento?"
        confirmLabel="Arquivar"
        loading={removing}
        onCancel={() => setConfirmId(null)}
        onConfirm={handleArchive}
      />
    </div>
  );
}
