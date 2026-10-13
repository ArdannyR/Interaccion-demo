import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { terapeutasService } from './terapeutasService';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';

export function TerapeutasList() {
  const [terapeutas, setTerapeutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTerapeutas() {
      try {
        const data = await terapeutasService.getTerapeutas();
        setTerapeutas(data);
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error al cargar la lista de terapeutas.");
      } finally {
        setLoading(false);
      }
    }
    fetchTerapeutas();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Terapeutas" />

      {loading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton h-[16rem]" />)}
        </div>
      ) : error ? (
        <div className="bg-(--color-danger-50) text-(--color-danger-700) p-6 rounded-xl border border-(--color-danger-200) text-center text-lg">
          {error}
        </div>
      ) : terapeutas.length === 0 ? (
        <div className="bg-(--color-surface) p-12 rounded-xl border border-(--color-border) text-center text-lg text-(--color-text-muted)">
          No se encontraron terapeutas activos.
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-6">
          {terapeutas.map((t, idx) => {
            const isAccent = idx % 2 === 0;
            return (
              <Card 
                key={t.id} 
                className="p-0 flex flex-col items-stretch text-center hover:shadow-lg transition-all hover:border-(--color-primary-300) cursor-pointer overflow-hidden"
                onClick={() => navigate(`/terapeutas/${t.id}`)}
              >
                <div className={`p-6 flex flex-col items-center ${isAccent ? 'bg-(--color-accent-50)' : 'bg-(--color-secondary-50)'}`}>
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-sm ${isAccent ? 'bg-(--color-accent-100) text-(--color-accent-700)' : 'bg-(--color-secondary-100) text-(--color-secondary-700)'}`}>
                    <span className="text-2xl font-bold uppercase">
                      {t.nombres?.charAt(0)}{t.apellidos?.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-(--color-text-main) line-clamp-2">
                    {t.nombres} {t.apellidos}
                  </h3>
                  <p className="text-(--color-text-muted) mt-2 capitalize font-medium">
                    {t.especialidad || 'Especialidad General'}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
