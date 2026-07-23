import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { falecidoService } from "@/services/falecidoService.js";
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
import { Plus, Eye, Archive } from "lucide-react";

export default function Falecidos() {
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
      const data = await falecidoService.list();
      setItems(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível carregar os falecidos."));
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
      await falecidoService.remove(confirmId);
      toast.success("Registro arquivado.");
      setConfirmId(null);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Erro ao arquivar."));
    } finally {
      setRemoving(false);
    }
  }

  const columns = [
    { key: "nome", label: "Nome" },
    { key: "documento", label: "Documento" },
    {
      key: "dataNascimento",
      label: "Nascimento",
      render: (r) => formatDate(r.dataNascimento, false),
    },
    {
      key: "dataFalecimento",
      label: "Falecimento",
      render: (r) => formatDate(r.dataFalecimento, false),
    },
    {
      key: "status",
      label: "Status",
      render: (r) =>
        r.ativo ? <Badge variant="success">Ativo</Badge> : <Badge>Arquivado</Badge>,
    },
    {
      key: "acoes",
      label: "Ações",
      render: (r) => (
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => navigate(`/falecidos/${r._id}`)}>
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
        title="Falecidos"
        actions={
          <Link to="/falecidos/novo">
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
          <EmptyState
            title="Nenhum falecido cadastrado"
            description="Cadastre o primeiro registro para começar."
            action={
              <Link to="/falecidos/novo">
                <Button>
                  <Plus size={16} /> Cadastrar
                </Button>
              </Link>
            }
          />
        ) : (
          <Table columns={columns} data={items} />
        )}
      </Card>

      <ConfirmModal
        open={!!confirmId}
        title="Arquivar registro"
        description="Tem certeza que deseja arquivar este falecido?"
        confirmLabel="Arquivar"
        loading={removing}
        onCancel={() => setConfirmId(null)}
        onConfirm={handleArchive}
      />
    </div>
  );
}
