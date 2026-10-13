import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { citasService } from '../citas/citasService';
import { terapeutasService } from '../terapeutas/terapeutasService';
import { getStartOfWeekLocal, addDaysLocal, getLocalTodayDate } from '../../utils/fechas';
import { WeeklyCalendar } from '../citas/WeeklyCalendar';
import { CitaFormModal } from '../citas/CitaFormModal';
import { CitaDetalleModal } from '../citas/CitaDetalleModal';
import { ProfessionalPicker } from './ProfessionalPicker';
import { Button } from '../../components/Button';
import { Spinner } from '../../components/Spinner';
import { PageHeader } from '../../components/PageHeader';

export function HorariosView() {
  const { perfil } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const paramProf = searchParams.get('profesional');
  const [profesionalVisto, setProfesionalVisto] = useState(() => paramProf || perfil?.id || '');
  const [terapeutas, setTerapeutas] = useState([]);
  
  const [citas, setCitas] = useState([]);
  const [semanaInicio, setSemanaInicio] = useState(getStartOfWeekLocal(getLocalTodayDate()));
  const [loading, setLoading] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [formInitialData, setFormInitialData] = useState({});
  const [formLockProfesional, setFormLockProfesional] = useState(false);

  // Sincronizar profesionalVisto inicial cuando perfil esté disponible
  useEffect(() => {
    if (!profesionalVisto && perfil?.id) {
      const p = searchParams.get('profesional');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfesionalVisto(p || perfil.id);
    }
  }, [perfil?.id, profesionalVisto, searchParams]);

  // Cargar terapeutas para el selector si es directora
  useEffect(() => {
    if (perfil?.rol === 'directora') {
      terapeutasService.getTerapeutas().then(data => {
        setTerapeutas(data || []);
      }).catch(err => {
        console.error('Error cargando terapeutas', err);
      });
    }
  }, [perfil?.rol]);

  // Validar parámetro de URL cuando los terapeutas estén cargados
  useEffect(() => {
    if (!perfil) return;
    const urlProf = searchParams.get('profesional');
    if (urlProf && urlProf !== perfil.id) {
      // Si ya cargaron terapeutas y este ID no es válido, volver a perfil.id
      if (terapeutas.length > 0 && !terapeutas.some(t => t.id === urlProf)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProfesionalVisto(perfil.id);
        setSearchParams(prev => {
          const next = new URLSearchParams(prev);
          next.delete('profesional');
          return next;
        }, { replace: true });
      }
    }
  }, [searchParams, terapeutas, perfil, setSearchParams]);

  // Construir opciones del selector
  const listaProfesionales = [];
  if (perfil) {
    listaProfesionales.push({
      id: perfil.id,
      nombres: perfil.nombres,
      apellidos: perfil.apellidos,
      especialidad: perfil.especialidad,
      esPropio: true
    });
  }
  terapeutas.forEach(t => {
    if (t.id !== perfil?.id) {
      listaProfesionales.push({
        id: t.id,
        nombres: t.nombres,
        apellidos: t.apellidos,
        especialidad: t.especialidad,
        esPropio: false
      });
    }
  });

  const selectedProf = listaProfesionales.find(p => p.id === profesionalVisto) || (perfil ? {
    id: perfil.id,
    nombres: perfil.nombres,
    apellidos: perfil.apellidos,
    especialidad: perfil.especialidad,
    esPropio: true
  } : null);

  const esPropio = !profesionalVisto || profesionalVisto === perfil?.id;

  const handleSelectProfesional = useCallback((id) => {
    setProfesionalVisto(id);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (id === perfil?.id) {
        next.delete('profesional');
      } else {
        next.set('profesional', id);
      }
      return next;
    }, { replace: true });
  }, [perfil?.id, setSearchParams]);

  // Cargar citas con bandera ignore para evitar respuestas desactualizadas
  useEffect(() => {
    if (!profesionalVisto) return;
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    async function loadCitas() {
      try {
        const hasta = addDaysLocal(semanaInicio, 4); // Viernes
        const data = await citasService.getCitas({
          desde: semanaInicio,
          hasta: hasta,
          profesionalId: profesionalVisto
        });
        if (!ignore) {
          setCitas(data || []);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error cargando citas', err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadCitas();

    return () => {
      ignore = true;
    };
  }, [profesionalVisto, semanaInicio, reloadTrigger]);

  const handleCambiarSemana = (dias) => {
    if (dias === 0) {
      setSemanaInicio(getStartOfWeekLocal(getLocalTodayDate()));
    } else {
      setSemanaInicio(prev => addDaysLocal(prev, dias));
    }
  };

  // "+ Nueva cita" abre el formulario con el profesional precargado = profesionalVisto y editable
  const handleNuevaCita = () => {
    setFormInitialData({ profesional_id: profesionalVisto || perfil?.id });
    setFormLockProfesional(false);
    setModalFormOpen(true);
  };

  // Al tocar una casilla vacía, el profesional queda precargado y BLOQUEADO = profesionalVisto
  const handleClickCasillaVacia = (fecha, hora) => {
    setFormInitialData({ 
      fecha, 
      hora_inicio: hora, 
      profesional_id: profesionalVisto || perfil?.id 
    });
    setFormLockProfesional(true);
    setModalFormOpen(true);
  };

  const handleClickCita = (cita) => {
    setCitaSeleccionada(cita);
    setModalDetalleOpen(true);
  };

  // Si se guarda una cita para una persona distinta a la que se estaba viendo, cambia la vista a esa persona
  const handleSuccessForm = (savedProfId) => {
    setModalFormOpen(false);
    if (savedProfId && savedProfId !== profesionalVisto) {
      handleSelectProfesional(savedProfId);
    } else {
      setReloadTrigger(prev => prev + 1);
    }
  };

  const handleCancelCita = async (id) => {
    await citasService.cancelCita(id);
    setModalDetalleOpen(false);
    setReloadTrigger(prev => prev + 1);
  };

  const handleCancelSerieDesde = async (serieId, desdeFecha) => {
    await citasService.cancelarDesde(serieId, desdeFecha);
    setModalDetalleOpen(false);
    setReloadTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header con título y selector de profesional */}
      <PageHeader
        title={esPropio ? 'Mi horario' : `Horario de ${selectedProf ? `${selectedProf.nombres} ${selectedProf.apellidos}` : 'Terapeuta'}`}
        subtitle={!esPropio && selectedProf?.especialidad ? selectedProf.especialidad : undefined}
        actions={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {perfil?.rol === 'directora' && (
              <ProfessionalPicker 
                profesionales={listaProfesionales}
                selectedId={profesionalVisto || perfil?.id}
                onSelect={handleSelectProfesional}
              />
            )}
            <Button 
              variant="accent"
              onClick={handleNuevaCita} 
              className="text-lg py-3 px-6 whitespace-nowrap"
            >
              + Nueva cita
            </Button>
          </div>
        }
      />
      
      {/* Calendario con indicador de carga overlay sin pantalla en blanco */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-(--color-surface)/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl transition-all">
            <Spinner />
          </div>
        )}
        <WeeklyCalendar 
          citas={citas}
          semanaInicio={semanaInicio}
          onCambiarSemana={handleCambiarSemana}
          onClickCasillaVacia={handleClickCasillaVacia}
          onClickCita={handleClickCita}
          modo="profesional"
        />
      </div>

      {modalFormOpen && (
        <CitaFormModal 
          onClose={() => setModalFormOpen(false)}
          onSuccess={handleSuccessForm}
          initialData={formInitialData}
          lockProfesional={formLockProfesional}
        />
      )}

      {modalDetalleOpen && citaSeleccionada && (
        <CitaDetalleModal 
          cita={citaSeleccionada}
          onClose={() => setModalDetalleOpen(false)}
          onEdit={(c) => {
            setFormInitialData(c);
            setFormLockProfesional(false);
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
