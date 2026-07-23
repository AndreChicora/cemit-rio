import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { jazigoService } from "@/services/jazigoService.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Table from "@/components/ui/Table.jsx";
import Button from "@/components/ui/Button.jsx";
import Badge from "@/components/ui/Badge.jsx";
import Loading from "@/components/ui/Loading.jsx";
import ErrorMessage from "@/components/ui/ErrorMessage.jsx";
import EmptyState from "@/components/ui/EmptyState.jsx";
import ConfirmModal from "@/components/ui/ConfirmModal.jsx";
import { Plus, Eye, Archive } from "lucide-react";

function statusBadge(status) {
  if (status === "livre") return <Badge variant="success">Livre</Badge>;
  if (status === "parcialmente_ocupado")
    return <Badge variant="warning">Parcialmente ocupado</Badge>;
  if (status === "lotado") return <Badge variant="danger">Lotado</Badge>;
  return <Badge>{status || "—"}</Badge>;
}

export default function Jazigos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await jazigoService.list();
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
      await jazigoService.remove(confirmId);
      toast.success("Jazigo arquivado.");
      setConfirmId(null);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setRemoving(false);
    }
  }

  const columns = [
    { key: "numero", label: "Número" },
    { key: "quadra", label: "Quadra" },
    { key: "capacidade", label: "Capacidade" },
    { key: "ocupacaoAtual", label: "Ocupação" },
    { key: "status", label: "Status", render: (r) => statusBadge(r.status) },
    {
      key: "acoes",
      label: "Ações",
      render: (r) => (
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => navigate(`/jazigos/${r._id}`)}>
            <Eye size={14} /> Ver
          </Button>
          {r.ativo && (
            <Button size="sm" variant="danger" onClick={() => setConfirmId(r._id)}>
              <Archive size={14} /> Arquivar
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Card
        title="Jazigos"
        actions={
          <Link to="/jazigos/novo">
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
          <EmptyState title="Nenhum jazigo cadastrado" />
        ) : (
          <Table columns={columns} data={items} />
        )}
      </Card>

      <ConfirmModal
        open={!!confirmId}
        title="Arquivar jazigo"
        description="Deseja arquivar este jazigo?"
        confirmLabel="Arquivar"
        loading={removing}
        onCancel={() => setConfirmId(null)}
        onConfirm={handleArchive}
      />
    </div>
  );
}
