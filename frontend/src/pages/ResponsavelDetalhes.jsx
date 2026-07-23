import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { responsavelService } from "@/services/responsavelService.js";
import { formatCpf } from "@/utils/formatCpf.js";
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

export default function ResponsavelDetalhes() {
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
      setData(await responsavelService.getById(id));
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
      await responsavelService.remove(id);
      toast.success("Responsável arquivado.");
      navigate("/responsaveis");
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
      <Card
        title={data.nome}
        actions={data.ativo ? <Badge variant="success">Ativo</Badge> : <Badge>Arquivado</Badge>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="CPF" value={formatCpf(data.cpf)} />
          <Field label="Telefone" value={data.telefone} />
          <Field label="E-mail" value={data.email} />
          <Field label="Endereço" value={data.endereco} />
          <Field label="Cadastrado em" value={formatDate(data.createdAt)} />
          <Field label="Atualizado em" value={formatDate(data.updatedAt)} />
        </div>
      </Card>
      <div className="flex justify-end gap-2">
        <Link to="/responsaveis">
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
        title="Arquivar responsável"
        description="Deseja arquivar este responsável?"
        confirmLabel="Arquivar"
        loading={removing}
        onCancel={() => setConfirm(false)}
        onConfirm={handleArchive}
      />
    </div>
  );
}
