import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { terapeutasService } from '../terapeutas/terapeutasService';
import { pacientesService } from '../pacientes/pacientesService';
import { citasService } from './citasService';
import { 
  getHorasPermitidas, 
  getLocalTodayDate, 
  formatTime, 
  isPastDateLocal,
  getDiaSemanaNombre,
  calcularFechasSerie,
  formatearResumenSerie,
  formatFechaCorta
} from '../../utils/fechas';
import { Button } from '../../components/Button';
import { DateInput } from '../../components/DateInput';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import { Spinner } from '../../components/Spinner';

export function CitaFormModal({ onClose, onSuccess, initialData = {}, lockPaciente = false, lockProfesional = false }) {
  const { perfil } = useAuth();
  const isEditing = Boolean(initialData.id);
  
  const [pacientes, setPacientes] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  
  const [formData, setFormData] = useState({
    paciente_id: initialData.paciente_id || '',
    profesional_id: initialData.profesional_id || '',
    fecha: initialData.fecha || getLocalTodayDate(),
    hora_inicio: initialData.hora_inicio ? formatTime(initialData.hora_inicio) : '08:00',
    notas: initialData.notas || ''
  });

  // Estado para citas repetidas (series)
  const [esSerie, setEsSerie] = useState(false);
  const [serieCantidad, setSerieCantidad] = useState(12);
  const [serieUnidad, setSerieUnidad] = useState('semanas');
  const [citasRango, setCitasRango] = useState([]);
  const [conflictosSubmit, setConflictosSubmit] = useState(null);

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Prevent weekend selection manually if native calendar allows it
  const handleChangeFecha = (e) => {
    const val = e.target.value;
    if (val) {
      const day = new Date(val + 'T00:00:00').getDay();
      if (day === 0 || day === 6) {
        setError('No se pueden programar citas los fines de semana.');
        return;
      }
    }
    setError('');
    setConflictosSubmit(null);
    setFormData(prev => ({ ...prev, fecha: val }));
  };

  // Efecto 1: Carga pacientes y terapeutas UNA sola vez (depende solo de perfil?.id)
  useEffect(() => {
    let ignore = false;
    async function loadOptions() {
      setLoadingOptions(true);
      try {
        const [pacs, teraps] = await Promise.all([
          pacientesService.getPacientes(''),
          terapeutasService.getTerapeutas()
        ]);
        if (ignore) return;
        setPacientes(pacs);
        
        const profs = [];
        if (perfil?.id) {
          profs.push({ id: perfil.id, nombre_mostrar: `Yo (${perfil?.nombres} ${perfil?.apellidos})` });
        }
        teraps.forEach(t => {
          if (t.id !== perfil?.id) {
            profs.push({ id: t.id, nombre_mostrar: `${t.nombres} ${t.apellidos} - ${t.especialidad || 'General'}` });
          }
        });
        setProfesionales(profs);
      } catch {
        if (!ignore) setError('Error al cargar opciones.');
      } finally {
        if (!ignore) setLoadingOptions(false);
      }
    }
    loadOptions();
    return () => {
      ignore = true;
    };
  }, [perfil?.id, perfil?.nombres, perfil?.apellidos]);

  // Efecto 2: Define el profesional por defecto cuando ya hay opciones disponibles
  useEffect(() => {
    if (profesionales.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => {
        if (prev.profesional_id) return prev;
        return {
          ...prev,
          profesional_id: initialData.profesional_id || profesionales[0].id
        };
      });
    }
  }, [profesionales, initialData.profesional_id]);

  // Trap focus / close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Bloquear el scroll del fondo mientras el modal esté abierto
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Calcular fechas de la serie para vista previa en vivo
  const fechasSerie = esSerie ? calcularFechasSerie(formData.fecha, serieCantidad, serieUnidad) : [];
  const resumenSerie = esSerie ? formatearResumenSerie(fechasSerie) : '';

  // Consultar citas existentes del rango para marcar colisiones en la vista previa
  useEffect(() => {
    if (!esSerie || fechasSerie.length === 0 || !formData.profesional_id) {
      return;
    }

    let ignore = false;
    const desde = fechasSerie[0];
    const hasta = fechasSerie[fechasSerie.length - 1];

    async function checkConflictosRango() {
      try {
        const data = await citasService.getCitas({
          desde,
          hasta,
          profesionalId: formData.profesional_id
        });
        if (!ignore) {
          setCitasRango(data || []);
        }
      } catch {
        // En caso de error en consulta previa silenciosa
      }
    }

    checkConflictosRango();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [esSerie, formData.profesional_id, formData.fecha, serieCantidad, serieUnidad, fechasSerie.length]);

  // Detección de colisiones para las fechas calculadas
  const fechasConConflicto = fechasSerie.filter(f => {
    return citasRango.some(c => c.fecha === f && formatTime(c.hora_inicio) === formatTime(formData.hora_inicio));
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConflictosSubmit(null);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setConflictosSubmit(null);
    
    if (isPastDateLocal(formData.fecha)) {
      setError('No se pueden crear citas en fechas pasadas.');
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await citasService.updateCita(initialData.id, {
          pacienteId: formData.paciente_id,
          profesionalId: formData.profesional_id,
          fecha: formData.fecha,
          horaInicio: formData.hora_inicio,
          notas: formData.notas
        });
      } else if (esSerie) {
        await citasService.createSerie({
          pacienteId: formData.paciente_id,
          profesionalId: formData.profesional_id,
          fechaInicio: formData.fecha,
          horaInicio: formData.hora_inicio,
          cantidad: serieCantidad,
          unidad: serieUnidad,
          notas: formData.notas
        });
      } else {
        await citasService.createCita({
          pacienteId: formData.paciente_id,
          profesionalId: formData.profesional_id,
          fecha: formData.fecha,
          horaInicio: formData.hora_inicio,
          notas: formData.notas
        });
      }
      onSuccess(formData.profesional_id);
    } catch (err) {
      if (err.isConflicto && err.conflictos) {
        setConflictosSubmit(err.conflictos);
        setError('No se creó ninguna cita porque algunas fechas están ocupadas.');
      } else {
        setError(err.message || 'Error al guardar cita.');
      }
    } finally {
      setSaving(false);
    }
  };

  const horas = getHorasPermitidas();
  const diaNombre = getDiaSemanaNombre(formData.fecha);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-(--color-surface) rounded-t-2xl sm:rounded-2xl rounded-b-none sm:rounded-b-2xl shadow-xl border border-(--color-border) w-full max-w-lg flex flex-col max-h-[92dvh] animate-slide-up sm:animate-scale-in"
        role="dialog" 
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-(--color-border) shrink-0">
          <h2 className="text-xl font-bold text-(--color-text-main) truncate">
            {isEditing ? 'Editar Cita' : 'Nueva Cita'}
          </h2>
          <button 
            onClick={onClose} 
            aria-label="Cerrar modal"
            className="w-11 h-11 min-w-11 min-h-11 flex items-center justify-center rounded-xl text-(--color-text-muted) hover:text-(--color-text-main) hover:bg-(--color-surface-hover) cursor-pointer transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain p-4 sm:p-5 flex-1 space-y-4 scroll-pb-8">
          {error && (
            <div className="bg-(--color-danger-50) text-(--color-danger-700) p-4 rounded-xl border border-(--color-danger-200) break-words">
              {error}
            </div>
          )}

          {conflictosSubmit && (
            <div className="bg-(--color-danger-50) text-(--color-danger-800) p-4 rounded-xl border border-(--color-danger-200) space-y-2 text-sm animate-fade-up break-words">
              <p className="font-bold">No se creó ninguna cita porque estas fechas están ocupadas:</p>
              {conflictosSubmit.profesional?.length > 0 && (
                <p>
                  <span className="font-semibold text-(--color-danger-900)">El terapeuta ya tiene cita en:</span>{' '}
                  {conflictosSubmit.profesional.map(f => formatFechaCorta(f, true)).join(', ')}
                </p>
              )}
              {conflictosSubmit.paciente?.length > 0 && (
                <p>
                  <span className="font-semibold text-(--color-danger-900)">El niño ya tiene cita en:</span>{' '}
                  {conflictosSubmit.paciente.map(f => formatFechaCorta(f, true)).join(', ')}
                </p>
              )}
            </div>
          )}

          {loadingOptions ? (
            <div className="flex justify-center p-8"><Spinner /></div>
          ) : (
            <form id="cita-form" onSubmit={handleSubmit} className="space-y-4">
              <Select
                label="Paciente *"
                name="paciente_id"
                value={formData.paciente_id}
                onChange={handleChange}
                required
                disabled={lockPaciente}
              >
                <option value="" disabled>Selecciona un paciente</option>
                {pacientes.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre_completo} ({p.cedula})</option>
                ))}
              </Select>

              <Select
                label="Profesional *"
                name="profesional_id"
                value={formData.profesional_id}
                onChange={handleChange}
                required
                disabled={lockProfesional}
              >
                <option value="" disabled>Selecciona profesional</option>
                {profesionales.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre_mostrar}</option>
                ))}
              </Select>

              {/* Interruptor grande: Repetir cada semana (solo al crear) */}
              {!isEditing && (
                <div className="p-4 rounded-xl border border-(--color-border) bg-(--color-surface-hover) flex items-center justify-between gap-4">
                  <div>
                    <span className="text-base font-bold text-(--color-text-main) block">
                      Repetir cada semana
                    </span>
                    <span className="text-xs text-(--color-text-muted)">
                      Programa una serie periódica el mismo día y hora
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={esSerie}
                    onClick={() => {
                      setEsSerie(!esSerie);
                      setConflictosSubmit(null);
                    }}
                    className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-(--color-primary-100) ${
                      esSerie ? 'bg-(--color-accent-500)' : 'bg-(--color-border)'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                        esSerie ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              )}

              {/* Campos de fecha y hora */}
              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4">
                <DateInput
                  label={esSerie ? `Primera cita (${diaNombre || 'día'}) *` : 'Fecha *'}
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChangeFecha}
                  min={getLocalTodayDate()}
                  required
                />
                
                <Select
                  label="Hora *"
                  name="hora_inicio"
                  value={formData.hora_inicio}
                  onChange={handleChange}
                  required
                >
                  {horas.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </Select>
              </div>

              {/* Controles de serie (Durante N semanas / meses) */}
              {esSerie && (
                <div className="p-4 rounded-xl border border-(--color-secondary-200) bg-(--color-secondary-50)/40 space-y-4 animate-scale-in">
                  <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4">
                    <Input
                      label="Durante *"
                      type="number"
                      min={1}
                      max={serieUnidad === 'semanas' ? 52 : 12}
                      value={serieCantidad}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 1;
                        const maxVal = serieUnidad === 'semanas' ? 52 : 12;
                        setSerieCantidad(Math.min(Math.max(1, val), maxVal));
                        setConflictosSubmit(null);
                      }}
                      required
                    />

                    <Select
                      label="Unidad *"
                      value={serieUnidad}
                      onChange={(e) => {
                        const unit = e.target.value;
                        setSerieUnidad(unit);
                        if (unit === 'meses' && serieCantidad > 12) {
                          setSerieCantidad(12);
                        }
                        setConflictosSubmit(null);
                      }}
                      required
                    >
                      <option value="semanas">semanas</option>
                      <option value="meses">meses</option>
                    </Select>
                  </div>

                  {/* Vista previa en vivo */}
                  <div className="p-3.5 rounded-xl bg-(--color-surface) border border-(--color-border) space-y-2">
                    <div className="flex items-center gap-2 text-(--color-primary-800) font-bold text-xs uppercase tracking-wider">
                      <svg className="w-4 h-4 text-(--color-accent-500)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Vista previa de la serie</span>
                    </div>
                    <p className="text-sm font-semibold text-(--color-text-main) break-words">
                      {resumenSerie}
                    </p>

                    {/* Marcar fechas que chocarían en rojo suave */}
                    {fechasConConflicto.length > 0 && (
                      <div className="pt-2 border-t border-(--color-danger-200) space-y-1">
                        {fechasConConflicto.map(fc => (
                          <div key={fc} className="flex items-center gap-2 text-xs font-semibold text-(--color-danger-700) bg-(--color-danger-50) px-2.5 py-1 rounded-lg border border-(--color-danger-200) break-words">
                            <span>⚠️ {formatFechaCorta(fc, true)}: Esta fecha ya está ocupada</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Textarea
                label="Notas (opcional)"
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                rows={3}
                placeholder="Detalles adicionales..."
              />
            </form>
          )}
        </div>

        <div className="p-4 sm:p-5 border-t border-(--color-border) flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-4 bg-(--color-surface-hover) rounded-b-none sm:rounded-b-2xl pb-safe shrink-0">
          <Button variant="outline" type="button" onClick={onClose} disabled={saving} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button type="submit" form="cita-form" disabled={saving || loadingOptions} className="w-full sm:w-auto">
            {saving ? <Spinner size="sm" /> : (esSerie ? 'Crear Serie de Citas' : 'Guardar Cita')}
          </Button>
        </div>
      </div>
    </div>
  );
}
