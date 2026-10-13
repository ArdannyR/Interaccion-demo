import { useSettings } from './SettingsContext';
import { Card } from '../../components/Card';

export function AjustesView() {
  const { textSize, setTextSize, motion, setMotion } = useSettings();

  const textSizes = [
    { id: 'normal', name: 'Normal' },
    { id: 'grande', name: 'Grande' },
    { id: 'muy-grande', name: 'Muy grande' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20 animate-fade-up">
      <h1 className="text-3xl md:text-4xl font-bold text-(--color-text-main)">Ajustes</h1>
      
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-(--color-primary-700)">Accesibilidad</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-(--color-text-main) mb-3">
              Tamaño de letra
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {textSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setTextSize(size.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    textSize === size.id 
                      ? 'border-(--color-primary-500) bg-(--color-primary-50)' 
                      : 'border-(--color-border) hover:border-(--color-primary-300)'
                  }`}
                >
                  <span className="text-lg font-medium text-(--color-text-main)">{size.name}</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-(--color-border)" />

          <div>
            <label className="block text-lg font-medium text-(--color-text-main) mb-3">
              Animaciones
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setMotion('activadas')}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  motion === 'activadas' 
                    ? 'border-(--color-primary-500) bg-(--color-primary-50)' 
                    : 'border-(--color-border) hover:border-(--color-primary-300)'
                }`}
              >
                <span className="text-lg font-medium text-(--color-text-main)">Activadas (Recomendado)</span>
              </button>
              <button
                onClick={() => setMotion('reducidas')}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  motion === 'reducidas' 
                    ? 'border-(--color-primary-500) bg-(--color-primary-50)' 
                    : 'border-(--color-border) hover:border-(--color-primary-300)'
                }`}
              >
                <span className="text-lg font-medium text-(--color-text-main)">Reducidas (Menos movimiento)</span>
              </button>
            </div>
          </div>
          
        </div>
      </Card>
    </div>
  );
}
