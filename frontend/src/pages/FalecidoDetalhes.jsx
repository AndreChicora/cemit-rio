import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { falecidoService } from "@/services/falecidoService.js";
import { sepultamentoService } from "@/services/sepultamentoService.js";
import { formatDate } from "@/utils/formatDate.js";
import { getErrorMessage } from "@/utils/getErrorMessage.js";
import Card from "@/components/ui/Card.jsx";
import Button from "@/components/ui/Button.jsx";
import Loading from "@/components/ui/Loading.jsx";
import ErrorMessage from "@/components/ui/ErrorMessage.jsx";
import Badge from "@/components/ui/Badge.jsx";
import ConfirmModal from "@/components/ui/ConfirmModal.jsx";

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-[#64748B]">{label}</p>
      <p className="mt-1 text-sm text-[#0F172A]">{value ?? "—"}</p>
    </div>
  );
}

export default function FalecidoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [sep, setSep] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const d = await falecidoService.getById(id);
      setData(d);
      try {
        const all = await sepultamentoService.list();
        const list = Array.isArray(all) ? all : all?.items || [];
        setSep(list.find((s) => s.falecidoId === id) || null);
      } catch {
        setSep(null);
      }
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível carregar."));
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
      await falecidoService.remove(id);
      toast.success("Registro arquivado.");
      navigate("/falecidos");
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
        actions={
          <div className="flex gap-2">
            {data.ativo ? (
              <Badge variant="success">Ativo</Badge>
            ) : (
              <Badge>Arquivado</Badge>
            )}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Documento" value={data.documento} />
          <Field label="Nome da mãe" value={data.nomeMae} />
          <Field label="Naturalidade" value={data.naturalidade} />
          <Field label="Data de nascimento" value={formatDate(data.dataNascimento, false)} />
          <Field label="Data de falecimento" value={formatDate(data.dataFalecimento, false)} />
          <Field label="Causa do óbito" value={data.causaObito} />
          <div className="md:col-span-2">
            <Field label="Observações" value={data.observacoes || "—"} />
          </div>
          <Field label="Cadastrado em" value={formatDate(data.createdAt)} />
          <Field label="Atualizado em" value={formatDate(data.updatedAt)} />
        </div>
      </Card>

      <Card title="Sepultamento vinculado">
        {sep ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Data" value={formatDate(sep.dataSepultamento)} />
            <Field label="Status" value={sep.status} />
            <Field label="Jazigo" value={sep.jazigoId} />
            <Field label="Responsável" value={sep.responsavelId} />
          </div>
        ) : (
          <p className="text-sm text-[#64748B]">Nenhum sepultamento vinculado.</p>
        )}
      </Card>

      <div className="flex justify-end gap-2">
        <Link to="/falecidos">
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
        title="Arquivar registro"
        description="Deseja arquivar este falecido?"
        confirmLabel="Arquivar"
        loading={removing}
        onCancel={() => setConfirm(false)}
        onConfirm={handleArchive}
      />
    </div>
  );
}
