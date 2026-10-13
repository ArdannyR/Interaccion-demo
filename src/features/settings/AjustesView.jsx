import { useSettings } from './SettingsContext';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';

export function AjustesView() {
  const { textSize, setTextSize, motion, setMotion } = useSettings();

  const textSizes = [
    { id: 'pequeno', name: 'Pequeño' },
    { id: 'mediano', name: 'Mediano' },
    { id: 'normal', name: 'Normal' },
    { id: 'grande', name: 'Grande' },
    { id: 'muy-grande', name: 'Muy grande' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-fade-up">
      <PageHeader title="Ajustes" />
      
      <Card className="p-5 md:p-6">
        <h2 className="text-xl font-semibold mb-6 text-(--color-primary-700)">Accesibilidad</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-base font-medium text-(--color-text-main) mb-1">
              Tamaño de la interfaz
            </label>
            <p className="text-sm text-(--color-text-muted) mb-3">
              Cambia el tamaño de letras, botones y espacios de toda la aplicación.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {textSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setTextSize(size.id)}
                  aria-pressed={textSize === size.id}
                  className={`p-3 rounded-xl border-2 transition-all text-center cursor-pointer ${
                    textSize === size.id 
                      ? 'border-(--color-accent-400) bg-(--color-accent-50)' 
                      : 'border-(--color-border) hover:border-(--color-accent-300)'
                  }`}
                >
                  <span className="text-base font-medium text-(--color-text-main)">{size.name}</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-(--color-border)" />

          <div>
            <label className="block text-base font-medium text-(--color-text-main) mb-3">
              Animaciones
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setMotion('activadas')}
                aria-pressed={motion === 'activadas'}
                className={`p-3 rounded-xl border-2 transition-all text-center cursor-pointer ${
                  motion === 'activadas' 
                    ? 'border-(--color-accent-400) bg-(--color-accent-50)' 
                    : 'border-(--color-border) hover:border-(--color-accent-300)'
                }`}
              >
                <span className="text-base font-medium text-(--color-text-main)">Activadas (Recomendado)</span>
              </button>
              <button
                onClick={() => setMotion('reducidas')}
                aria-pressed={motion === 'reducidas'}
                className={`p-3 rounded-xl border-2 transition-all text-center cursor-pointer ${
                  motion === 'reducidas' 
                    ? 'border-(--color-accent-400) bg-(--color-accent-50)' 
                    : 'border-(--color-border) hover:border-(--color-accent-300)'
                }`}
              >
                <span className="text-base font-medium text-(--color-text-main)">Reducidas (Menos movimiento)</span>
              </button>
            </div>
          </div>
          
        </div>
      </Card>
    </div>
  );
}
