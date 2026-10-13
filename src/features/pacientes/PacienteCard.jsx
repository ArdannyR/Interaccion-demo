import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';

export function PacienteCard({ paciente }) {
  const navigate = useNavigate();
  const plan = paciente.latestPlan;

  return (
    <Card className="flex flex-col h-full overflow-hidden border border-(--color-border) animate-fade-up">
      {/* Top area with avatar and name */}
      <div className="flex flex-col items-center p-4 bg-linear-to-b from-(--color-accent-50) to-(--color-secondary-100) border-b border-(--color-border)">
        <div className="p-1 bg-linear-to-br from-(--color-accent-300) to-(--color-secondary-400) rounded-full shadow-sm mb-4 transition-transform group-hover:scale-105">
          <div className="w-16 h-16 bg-(--color-surface) rounded-full flex items-center justify-center text-(--color-accent-500)">
            {/* SVG Avatar Genérico Infantil */}
            <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-bold text-center text-(--color-text-main) line-clamp-2">
          {paciente.nombre_completo}
        </h3>
      </div>

      {/* Bottom areas */}
      <div className="flex divide-x divide-(--color-border) flex-1 min-h-[3.5rem]">
        <button 
          onClick={() => navigate(`/pacientes/${paciente.id}`)}
          className="flex-1 min-h-11 p-3 text-center hover:bg-(--color-accent-50) active:bg-(--color-accent-100) transition-colors flex flex-col justify-center min-w-0 cursor-pointer"
        >
          <span className="text-sm font-semibold text-(--color-primary-700) block mb-0.5">
            Datos
          </span>
          <span className="text-sm text-(--color-text-muted) break-words line-clamp-2">Ver perfil</span>
        </button>
        
        <button 
          onClick={() => {
            if (plan) {
              navigate(`/pacientes/${paciente.id}/plan/${plan.id}/editar`);
            } else {
              navigate(`/pacientes/${paciente.id}/plan/nuevo`);
            }
          }}
          className="flex-1 min-h-11 p-3 text-center hover:bg-(--color-secondary-50) active:bg-(--color-secondary-100) transition-colors flex flex-col justify-center min-w-0 cursor-pointer"
        >
          <span className="text-sm font-semibold text-(--color-secondary-700) block mb-0.5">
            Diagnóstico
          </span>
          <span className="text-sm text-(--color-text-muted) break-words line-clamp-2">
            {plan ? plan.diagnostico : "Sin plan"}
          </span>
        </button>
      </div>
    </Card>
  );
}
