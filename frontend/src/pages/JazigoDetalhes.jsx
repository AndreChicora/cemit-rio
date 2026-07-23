import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { jazigoService } from "@/services/jazigoService.js";
import { formatDate } from "@/utils/formatDate.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Button from "@/components/ui/Button.jsx";
import Badge from "@/components/ui/Badge.jsx";
import Loading from "@/components/ui/Loading.jsx";
import ErrorMessage from "@/components/ui/ErrorMessage.jsx";
import ConfirmModal from "@/components/ui/ConfirmModal.jsx";

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-[#64748B]">{label}</p>
      <p className="mt-1 text-sm text-[#0F172A]">{value ?? "—"}</p>
    </div>
  );
}

function statusBadge(status) {
  if (status === "livre") return <Badge variant="success">Livre</Badge>;
  if (status === "parcialmente_ocupado")
    return <Badge variant="warning">Parcialmente ocupado</Badge>;
  if (status === "lotado") return <Badge variant="danger">Lotado</Badge>;
  return <Badge>{status || "—"}</Badge>;
}

export default function JazigoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      setData(await jazigoService.getById(id));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleArchive() {
    setRemoving(true);
    try {
      await jazigoService.remove(id);
      toast.success("Jazigo arquivado.");
      navigate("/jazigos");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setRemoving(false);
      setConfirm(false);
    }
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <Card title={`Jazigo ${data.numero}`} actions={statusBadge(data.status)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Quadra" value={data.quadra} />
          <Field label="Capacidade" value={data.capacidade} />
          <Field label="Ocupação atual" value={data.ocupacaoAtual} />
          <Field label="Responsáveis" value={(data.responsavelIds || []).join(", ") || "—"} />
          <Field label="Cadastrado em" value={formatDate(data.createdAt)} />
          <Field label="Atualizado em" value={formatDate(data.updatedAt)} />
        </div>
      </Card>
      <div className="flex justify-end gap-2">
        <Link to="/jazigos">
          <Button variant="secondary">Voltar</Button>
        </Link>
        {data.ativo && (
          <Button variant="danger" onClick={() => setConfirm(true)}>
            Arquivar
          </Button>
        )}
      </div>

      <ConfirmModal
        open={confirm}
        title="Arquivar jazigo"
        description="Deseja arquivar este jazigo?"
        confirmLabel="Arquivar"
        loading={removing}
        onCancel={() => setConfirm(false)}
        onConfirm={handleArchive}
      />
    </div>
  );
}
