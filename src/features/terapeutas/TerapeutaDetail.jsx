import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { terapeutasService } from './terapeutasService';
import { citasService } from '../citas/citasService';
import { Button } from '../../components/Button';
import { Spinner } from '../../components/Spinner';
import { WeeklyCalendar } from '../citas/WeeklyCalendar';
import { ProximasCitas } from '../citas/ProximasCitas';
import { CitaFormModal } from '../citas/CitaFormModal';
import { CitaDetalleModal } from '../citas/CitaDetalleModal';
import { getStartOfWeekLocal, addDaysLocal, getLocalTodayDate } from '../../utils/fechas';

export function TerapeutaDetail() {
  const { id } = useParams();
  
  const [terapeuta, setTerapeuta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Citas state
  const [citasSemana, setCitasSemana] = useState([]);
  const [proximasCitas, setProximasCitas] = useState([]);
  const [semanaInicio, setSemanaInicio] = useState(getStartOfWeekLocal(getLocalTodayDate()));
  const [loadingCitas, setLoadingCitas] = useState(true);

  // Modals state
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [formInitialData, setFormInitialData] = useState({});

  const fetchCitas = async () => {
    setLoadingCitas(true);
    try {
      const hasta = addDaysLocal(semanaInicio, 4); // Viernes
      const [dataSemana, dataProximas] = await Promise.all([
        citasService.getCitas({ desde: semanaInicio, hasta: hasta, profesionalId: id }),
        citasService.getCitas({ desde: getLocalTodayDate(), profesionalId: id })
      ]);
      setCitasSemana(dataSemana);
      setProximasCitas(dataProximas);
    } catch (err) {
      console.error('Error cargando citas', err);
    } finally {
      setLoadingCitas(false);
    }
  };

  useEffect(() => {
    terapeutasService.getTerapeuta(id)
      .then(setTerapeuta)
      .catch(() => setError('Error al cargar la información del terapeuta'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCitas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, semanaInicio]);

  const handleCambiarSemana = (dias) => {
    if (dias === 0) {
      setSemanaInicio(getStartOfWeekLocal(getLocalTodayDate()));
    } else {
      setSemanaInicio(prev => addDaysLocal(prev, dias));
    }
  };

  const handleClickCasillaVacia = (fecha, hora) => {
    setFormInitialData({ fecha, hora_inicio: hora, profesional_id: id });
    setModalFormOpen(true);
  };

  const handleClickCita = (cita) => {
    setCitaSeleccionada(cita);
    setModalDetalleOpen(true);
  };

  const handleSuccessForm = () => {
    setModalFormOpen(false);
    fetchCitas();
  };

  const handleCancelCita = async (citaId) => {
    await citasService.cancelCita(citaId);
    setModalDetalleOpen(false);
    fetchCitas();
  };

  const handleCancelSerieDesde = async (serieId, desdeFecha) => {
    await citasService.cancelarDesde(serieId, desdeFecha);
    setModalDetalleOpen(false);
    fetchCitas();
  };

  if (loading) return <div className="flex justify-center p-12"><Spinner /></div>;
  if (error) return <div className="text-(--color-danger-600) text-center p-12 text-lg">{error}</div>;
  if (!terapeuta) return <div className="text-center p-12 text-lg">Terapeuta no encontrado</div>;

  const iniciales = `${terapeuta.nombres.charAt(0)}${terapeuta.apellidos.charAt(0)}`.toUpperCase();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 bg-(--color-surface) p-4 sm:p-6 rounded-2xl border border-(--color-border) shadow-sm text-center md:text-left">
        <div className="w-20 h-20 rounded-full bg-(--color-primary-100) flex items-center justify-center text-2xl font-bold text-(--color-primary-800) shrink-0">
          {iniciales}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-(--color-text-main) break-words">
            {terapeuta.nombres} {terapeuta.apellidos}
          </h1>
          <p className="text-base sm:text-lg text-(--color-text-muted) mt-1 sm:mt-2 break-words">{terapeuta.especialidad || 'Terapeuta General'}</p>
          <Link to="/terapeutas" className="min-h-11 inline-flex items-center text-(--color-primary-600) hover:underline mt-2 sm:mt-4 font-medium">
            &larr; Volver al directorio
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Widget de Próximas Citas */}
        <div className="md:col-span-1 space-y-6">
          <ProximasCitas 
            citas={proximasCitas} 
            modo="profesional"
            onClickCita={handleClickCita}
          />
        </div>

        {/* Tab content principal (Citas Calendario) */}
        <div className="md:col-span-2 space-y-6">
          
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <h2 className="text-xl font-semibold text-(--color-primary-700) break-words">Calendario de {terapeuta.nombres}</h2>
              <Button 
                onClick={() => {
                  setFormInitialData({ profesional_id: id });
                  setModalFormOpen(true);
                }}
                className="w-full sm:w-auto min-h-11"
              >
                + Agendar cita
              </Button>
            </div>

            <div className="relative">
              {loadingCitas && (
                <div className="absolute inset-0 bg-(--color-surface)/50 z-10 flex items-center justify-center rounded-xl">
                  <Spinner />
                </div>
              )}
              <WeeklyCalendar 
                citas={citasSemana}
                semanaInicio={semanaInicio}
                onCambiarSemana={handleCambiarSemana}
                onClickCasillaVacia={handleClickCasillaVacia}
                onClickCita={handleClickCita}
                modo="profesional"
              />
            </div>
          </section>

        </div>

      </div>

      {modalFormOpen && (
        <CitaFormModal 
          onClose={() => setModalFormOpen(false)}
          onSuccess={handleSuccessForm}
          initialData={formInitialData}
          lockProfesional={true}
        />
      )}

      {modalDetalleOpen && citaSeleccionada && (
        <CitaDetalleModal 
          cita={citaSeleccionada}
          onClose={() => setModalDetalleOpen(false)}
          onEdit={(c) => {
            setFormInitialData(c);
            setModalDetalleOpen(false);
            setModalFormOpen(true);
          }}
          onCancelCita={handleCancelCita}
          onCancelSerieDesde={handleCancelSerieDesde}
        />
      )}

    </div>
  );
}
