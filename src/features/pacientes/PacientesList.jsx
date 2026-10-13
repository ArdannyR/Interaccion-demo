import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pacientesService } from './pacientesService';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { PacienteCard } from './PacienteCard';

export function PacientesList() {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    async function fetchPacientes() {
      setLoading(true);
      setError(null);
      try {
        const data = await pacientesService.getPacientes(search);
        setPacientes(data);
      } catch (err) {
        console.error("Error al cargar la lista de pacientes", err);
        setError("Ocurrió un error al cargar la lista de pacientes.");
      } finally {
        setLoading(false);
      }
    }
    
    // Debounce search
    timer = setTimeout(fetchPacientes, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pacientes"
        actions={
          <Link to="/pacientes/nuevo" className="w-full sm:w-auto">
            <Button variant="accent" className="w-full sm:w-auto">+ Añadir paciente</Button>
          </Link>
        }
      />

      <div className="bg-(--color-surface) p-3 rounded-xl border border-(--color-border) shadow-sm">
        <Input 
          placeholder="Buscar por número de cédula o nombre completo..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton h-[15rem]" />)}
        </div>
      ) : error ? (
        <div className="bg-(--color-danger-50) text-(--color-danger-700) p-6 rounded-xl border border-(--color-danger-200) text-center text-lg">
          {error}
        </div>
      ) : pacientes.length === 0 ? (
        <div className="bg-(--color-surface) p-12 rounded-xl border border-(--color-border) text-center text-lg text-(--color-text-muted)">
          No se encontraron pacientes.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
          {pacientes.map((p) => (
            <PacienteCard key={p.id} paciente={p} />
          ))}
        </div>
      )}
    </div>
  );
}
