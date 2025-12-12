import { useParams, useNavigate, Link } from "react-router-dom";
import {
  usePhotoRequestDetail,
  useRespondPhotoRequest,
} from "@/hooks/usePhotoRequest";
import { useLivenessPhotoUrl } from "@/hooks/useLiveness";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

function SolicitudDetailPage() {
  const { requestId } = useParams<{ requestId: string }>();

  const navigate = useNavigate();

  const { data, isLoading, isError } = usePhotoRequestDetail(requestId);
  const { mutate: respond, isPending } = useRespondPhotoRequest();

  const [status, setStatus] = useState<"APROBADO" | "RECHAZADO">("APROBADO");
  const [comment, setComment] = useState("");

  // 1. Cuando ya tenemos la solicitud, sacamos la key

  const currentPhotoKey = data?.student.card_photo_key ?? null;
  const newPhotoKey = data?.new_photo_url ?? null;

  // 2. Pedimos al servicio de liveness el URL firmado
  // Foto actual
  const {
    data: currentPhotoUrl,
    isLoading: isCurrentLoading,
    isError: isCurrentError,
  } = useLivenessPhotoUrl(currentPhotoKey);

  // Foto nueva
  const {
    data: newPhotoUrl,
    isLoading: isNewLoading,
    isError: isNewError,
  } = useLivenessPhotoUrl(newPhotoKey);

  if (isLoading) {
    return <p className="p-4">Cargando solicitud...</p>;
  }

  if (isError || !data) {
    return (
      <div className="p-4">
        <p className="text-red-600 mb-2">No se pudo cargar la solicitud.</p>
        <Button asChild>
          <Link to="/dashboard/solicitudes">Volver a solicitudes</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!requestId) return;

    const trimmed = comment.trim();

    // Si RECHAZADO, obligamos a escribir motivo
    if (status === "RECHAZADO" && !trimmed) {
      // Puedes usar toast si quieres
      toast("Debes indicar el motivo de rechazo.");
      return;
    }

    const responseMessage =
      trimmed ||
      (status === "APROBADO"
        ? "Solicitud aprobada sin comentario adicional."
        : "Solicitud rechazada sin motivo detallado.");

    respond(
      {
        requestId,
        status,
        response_message: responseMessage,
      },
      {
        onSuccess: () => {
          navigate("/dashboard/solicitudes", { replace: true });
        },
      }
    );
  };

  const student = data.student;

  return (
    <div className="space-y-6">
      <Button asChild variant="outline" className="mb-2 cursor-pointer">
        <Link to="/dashboard/solicitudes">← Volver a solicitudes</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de solicitud</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row md:items-start gap-12 md:gap-24">
          {/* Info estudiante */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg">
              {student.name} {student.last_name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Código: {student.student_code}
            </p>
            <p className="text-sm text-muted-foreground">
              Correo: {student.email}
            </p>
            <p className="text-sm text-muted-foreground">
              Programa: {student.career}
            </p>
            <p className="text-sm text-muted-foreground">
              Fecha solicitud:{" "}
              {new Date(data.application_date).toLocaleString("es-CO")}
            </p>
          </div>

          {/* Columna de fotos */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-center">
            {/* Foto actual */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium text-center w-full">
                Foto actual en carnet
              </span>

              {isCurrentLoading && (
                <span className="text-xs text-muted-foreground">
                  Cargando foto actual...
                </span>
              )}

              {isCurrentError && !isCurrentLoading && (
                <span className="text-xs text-red-600">
                  No se pudo cargar la foto actual.
                </span>
              )}

              {!isCurrentLoading && !isCurrentError && currentPhotoUrl && (
                <img
                  src={currentPhotoUrl}
                  alt="Foto actual del estudiante"
                  className="w-32 h-32 md:w-36 md:h-36 rounded-lg object-cover border shadow-sm"
                />
              )}

              {!isCurrentLoading && !isCurrentError && !currentPhotoUrl && (
                <span className="text-xs text-muted-foreground">
                  El estudiante no tiene foto registrada.
                </span>
              )}
            </div>

            {/* Foto solicitada */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium text-center w-full">
                Foto solicitada
              </span>

              {isNewLoading && (
                <span className="text-xs text-muted-foreground">
                  Cargando foto solicitada...
                </span>
              )}

              {isNewError && !isNewLoading && (
                <span className="text-xs text-red-600">
                  No se pudo cargar la foto solicitada.
                </span>
              )}

              {!isNewLoading && !isNewError && newPhotoUrl && (
                <img
                  src={newPhotoUrl}
                  alt="Nueva foto del estudiante"
                  className="w-32 h-32 md:w-36 md:h-36 rounded-lg object-cover border shadow-sm"
                />
              )}

              {!isNewLoading && !isNewError && !newPhotoUrl && (
                <span className="text-xs text-muted-foreground">
                  No hay foto asociada a esta solicitud.
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulario de aprobación/rechazo */}
      <Card>
        <CardHeader>
          <CardTitle>Responder solicitud</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={status}
            onValueChange={(value) =>
              setStatus(value as "APROBADO" | "RECHAZADO")
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="APROBADO" id="aprobado" />
              <Label htmlFor="aprobado">Aprobar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="RECHAZADO" id="rechazado" />
              <Label htmlFor="rechazado">Rechazar</Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="comment">
              Comentario (opcional, pero recomendable)
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe brevemente el motivo de la decisión..."
              rows={4}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="cursor-pointer"
          >
            {isPending ? "Enviando..." : "Enviar respuesta"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default SolicitudDetailPage;
