import { useState } from 'react';
import { Button } from '../../components/Button';
import { formatTime, formatFechaCorta } from '../../utils/fechas';
import { Spinner } from '../../components/Spinner';

export function CitaDetalleModal({ cita, onClose, onEdit, onCancelCita, onCancelSerieDesde }) {
  const [canceling, setCanceling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!cita) return null;

  const handleCancelSingle = async () => {
    setCanceling(true);
    await onCancelCita(cita.id);
    setCanceling(false);
  };

  const handleCancelSeries = async () => {
    setCanceling(true);
    if (onCancelSerieDesde) {
      await onCancelSerieDesde(cita.serie_id, cita.fecha);
    } else {
      await onCancelCita(cita.id);
    }
    setCanceling(false);
  };

  const fechaFormateada = new Date(cita.fecha + 'T00:00:00').toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const serieResumen = cita.series_citas 
    ? `${cita.series_citas.cantidad} ${cita.series_citas.unidad} desde el ${formatFechaCorta(cita.series_citas.fecha_inicio || cita.fecha)}`
    : `Desde el ${formatFechaCorta(cita.fecha)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div 
        className="bg-(--color-surface) rounded-2xl shadow-xl border border-(--color-border) w-full max-w-md flex flex-col"
        role="dialog" 
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-5 border-b border-(--color-border)">
          <h2 className="text-xl font-bold text-(--color-text-main)">Detalle de Cita</h2>
          <button onClick={onClose} className="text-(--color-text-muted) hover:text-(--color-text-main) p-2 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          
          {/* Etiqueta de serie repetitiva si aplica */}
          {cita.serie_id && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-(--color-secondary-100) border border-(--color-secondary-200) text-(--color-primary-900) animate-scale-in">
              <svg className="w-5 h-5 text-(--color-secondary-700) shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div>
                <span className="font-bold text-sm block">Se repite cada semana</span>
                <span className="text-xs text-(--color-primary-800) opacity-90">{serieResumen}</span>
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold uppercase text-(--color-text-muted) tracking-wider">Fecha y Hora</p>
            <p className="text-base text-(--color-text-main) font-medium capitalize mt-1">{fechaFormateada}</p>
            <p className="text-lg font-bold text-(--color-primary-700)">{formatTime(cita.hora_inicio)} - {formatTime(cita.hora_fin)}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase text-(--color-text-muted) tracking-wider">Paciente</p>
            <p className="text-lg text-(--color-text-main) font-medium mt-1">{cita.pacientes?.nombre_completo}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase text-(--color-text-muted) tracking-wider">Profesional</p>
            <p className="text-base text-(--color-text-main) mt-1">{cita.perfiles?.nombres} {cita.perfiles?.apellidos}</p>
          </div>

          {cita.notas && (
            <div className="bg-(--color-primary-50) p-4 rounded-xl border border-(--color-primary-200)">
              <p className="text-sm font-semibold text-(--color-primary-800) mb-1">Notas</p>
              <p className="text-(--color-primary-900) whitespace-pre-wrap">{cita.notas}</p>
            </div>
          )}

          {showConfirm && (
            <div className="bg-(--color-danger-50) p-4 rounded-xl border border-(--color-danger-200) text-center space-y-3 animate-fade-up">
              {cita.serie_id ? (
                <>
                  <p className="text-(--color-danger-900) font-bold text-base">
                    Esta cita forma parte de una serie semanal.
                  </p>
                  <p className="text-sm text-(--color-danger-800)">
                    ¿Deseas cancelar únicamente esta cita o todas las que siguen en la serie?
                  </p>
                  <div className="flex flex-col gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      className="border-(--color-danger-300) text-(--color-danger-700) hover:bg-(--color-danger-100) text-sm py-2.5" 
                      onClick={handleCancelSingle} 
                      disabled={canceling}
                    >
                      {canceling ? <Spinner size="sm" /> : 'Cancelar solo esta cita'}
                    </Button>
                    <Button 
                      variant="danger" 
                      className="text-sm py-2.5"
                      onClick={handleCancelSeries} 
                      disabled={canceling}
                    >
                      {canceling ? <Spinner size="sm" /> : 'Cancelar esta y todas las siguientes'}
                    </Button>
                    <button 
                      type="button" 
                      className="text-xs text-(--color-text-muted) hover:text-(--color-text-main) mt-1 underline cursor-pointer"
                      onClick={() => setShowConfirm(false)}
                      disabled={canceling}
                    >
                      Volver atrás
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-(--color-danger-800) font-semibold">¿Seguro que desea cancelar esta cita?</p>
                  <div className="flex justify-center gap-4 pt-1">
                    <Button 
                      variant="outline" 
                      className="border-(--color-danger-300) text-(--color-danger-700) hover:bg-(--color-danger-100)" 
                      onClick={() => setShowConfirm(false)} 
                      disabled={canceling}
                    >
                      No, volver
                    </Button>
                    <Button variant="danger" onClick={handleCancelSingle} disabled={canceling}>
                      {canceling ? <Spinner size="sm" /> : 'Sí, cancelar'}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>

        {!showConfirm && (
          <div className="p-5 border-t border-(--color-border) flex justify-between bg-(--color-surface-hover) rounded-b-2xl">
            <button 
              onClick={() => setShowConfirm(true)}
              className="text-(--color-danger-600) font-semibold px-4 py-2 hover:bg-(--color-danger-50) rounded-lg transition-colors cursor-pointer"
            >
              Cancelar cita
            </button>
            <Button onClick={() => onEdit(cita)}>
              Editar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
