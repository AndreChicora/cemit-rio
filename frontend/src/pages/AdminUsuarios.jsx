import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usuarioService } from "@/services/usuarioService.js";
import { formatDate } from "@/utils/formatDate.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Table from "@/components/ui/Table.jsx";
import Badge from "@/components/ui/Badge.jsx";
import Button from "@/components/ui/Button.jsx";
import Loading from "@/components/ui/Loading.jsx";
import ErrorMessage from "@/components/ui/ErrorMessage.jsx";
import EmptyState from "@/components/ui/EmptyState.jsx";
import ConfirmModal from "@/components/ui/ConfirmModal.jsx";
import { Archive } from "lucide-react";

export default function AdminUsuarios() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [removing, setRemoving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await usuarioService.list();
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
      await usuarioService.remove(confirmId);
      toast.success("Usuário arquivado.");
      setConfirmId(null);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setRemoving(false);
    }
  }

  const columns = [
    { key: "nome", label: "Nome" },
    { key: "email", label: "E-mail" },
    { key: "cargo", label: "Cargo" },
    {
      key: "status",
      label: "Status",
      render: (r) =>
        r.ativo ? <Badge variant="success">Ativo</Badge> : <Badge>Arquivado</Badge>,
    },
    { key: "createdAt", label: "Cadastro", render: (r) => formatDate(r.createdAt) },
    {
      key: "acoes",
      label: "Ações",
      render: (r) =>
        r.ativo ? (
          <Button size="sm" variant="danger" onClick={() => setConfirmId(r._id)}>
            <Archive size={14} /> Arquivar
          </Button>
        ) : null,
    },
  ];

  return (
    <div className="space-y-4">
      <Card title="Usuários do sistema">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={load} />
        ) : items.length === 0 ? (
          <EmptyState title="Nenhum usuário cadastrado" />
        ) : (
          <Table columns={columns} data={items} />
        )}
      </Card>

      <ConfirmModal
        open={!!confirmId}
        title="Arquivar usuário"
        description="Deseja arquivar este usuário?"
        confirmLabel="Arquivar"
        loading={removing}
        onCancel={() => setConfirmId(null)}
        onConfirm={handleArchive}
      />
    </div>
  );
}
