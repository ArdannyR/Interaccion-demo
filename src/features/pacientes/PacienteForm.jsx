import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pacientesService } from './pacientesService';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Spinner } from '../../components/Spinner';
import { DateInput } from '../../components/DateInput';
import { validarCedulaEcuatoriana } from '../../utils/cedula';
import { getLocalTodayDate } from '../../utils/fechas';

export function PacienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    cedula: '',
    nombre_completo: '',
    fecha_nacimiento: '',
    direccion: '',
    madre_nombre: '',
    madre_telefono: '',
    padre_nombre: '',
    padre_telefono: '',
    contacto_nombre: '',
    contacto_telefono: '',
    contacto_direccion: '',
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      pacientesService.getPaciente(id)
        .then(data => {
          setFormData({
            cedula: data.cedula || '',
            nombre_completo: data.nombre_completo || '',
            fecha_nacimiento: data.fecha_nacimiento || '',
            direccion: data.direccion || '',
            madre_nombre: data.madre_nombre || '',
            madre_telefono: data.madre_telefono || '',
            padre_nombre: data.padre_nombre || '',
            padre_telefono: data.padre_telefono || '',
            contacto_nombre: data.contacto_nombre || '',
            contacto_telefono: data.contacto_telefono || '',
            contacto_direccion: data.contacto_direccion || '',
          });
        })
        .catch(() => setError('Error al cargar datos del paciente'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cedula') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación de teléfonos (7 a 10 dígitos)
    const phoneRegex = /^\d{7,10}$/;
    if (!phoneRegex.test(formData.madre_telefono)) {
      setError('El teléfono de la madre debe tener entre 7 y 10 dígitos numéricos.');
      return;
    }
    if (!phoneRegex.test(formData.padre_telefono)) {
      setError('El teléfono del padre debe tener entre 7 y 10 dígitos numéricos.');
      return;
    }
    if (formData.contacto_telefono && !phoneRegex.test(formData.contacto_telefono)) {
      setError('El teléfono del contacto debe tener entre 7 y 10 dígitos numéricos.');
      return;
    }

    // Validación de cédula
    if (!validarCedulaEcuatoriana(formData.cedula)) {
      setError('La cédula ingresada no es válida.');
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await pacientesService.updatePaciente(id, formData);
        navigate(`/pacientes/${id}`);
      } else {
        const newPaciente = await pacientesService.createPaciente(formData);
        navigate(`/pacientes/${newPaciente.id}/plan/nuevo`);
      }
    } catch (err) {
      setError(err.message || 'Error al guardar el paciente');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Spinner /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 pb-safe">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-(--color-text-main) break-words">
          {isEditing ? 'Editar Paciente' : 'Añadir Paciente'}
        </h1>
        <Button variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto min-h-11">
          Cancelar
        </Button>
      </div>

      {error && (
        <div className="bg-(--color-danger-50) text-(--color-danger-700) p-4 rounded-xl border border-(--color-danger-200) break-words">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-(--color-surface) p-4 sm:p-5 md:p-6 rounded-xl shadow-sm border border-(--color-border) space-y-6">
        
        {/* Sección: Datos del Niño */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-(--color-primary-700) border-b border-(--color-border) pb-2">Datos del Niño</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Input
              label="Número de cédula *"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              autoFocus={!isEditing}
              inputMode="numeric"
              maxLength={10}
              autoComplete="off"
              helperText="10 dígitos"
              required
            />
            <Input
              label="Nombre completo *"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <DateInput
              label="Fecha de nacimiento *"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              max={getLocalTodayDate()}
              required
              helperText="Toca el calendario para elegir"
            />
            <Input
              label="Dirección de residencia *"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              autoComplete="street-address"
              required
            />
          </div>
        </section>

        {/* Sección: Padres */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-(--color-primary-700) border-b border-(--color-border) pb-2">Datos de los Padres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Input
              label="Nombre de la madre *"
              name="madre_nombre"
              value={formData.madre_nombre}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <Input
              label="Teléfono de la madre *"
              name="madre_telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={formData.madre_telefono}
              onChange={handleChange}
              required
            />
            <Input
              label="Nombre del padre *"
              name="padre_nombre"
              value={formData.padre_nombre}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <Input
              label="Teléfono del padre *"
              name="padre_telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={formData.padre_telefono}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* Sección: Contacto Emergencia */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-(--color-primary-700) border-b border-(--color-border) pb-2">Otro familiar a quien contactar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Input
              label="Nombre (opcional)"
              name="contacto_nombre"
              value={formData.contacto_nombre}
              onChange={handleChange}
              autoComplete="name"
            />
            <Input
              label="Teléfono (opcional)"
              name="contacto_telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={formData.contacto_telefono}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <Input
                label="Dirección (opcional)"
                name="contacto_direccion"
                value={formData.contacto_direccion}
                onChange={handleChange}
                autoComplete="street-address"
              />
            </div>
          </div>
        </section>

        <div className="pt-4 sm:pt-6">
          <Button type="submit" disabled={saving} className="w-full text-lg min-h-11 py-3">
            {saving ? <Spinner size="sm" color="text-white" /> : (isEditing ? 'Guardar Cambios' : 'Guardar y Continuar a Plan')}
          </Button>
        </div>
      </form>
    </div>
  );
}
