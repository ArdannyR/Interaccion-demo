import { PageHeader } from '../../components/PageHeader';

export function PagosView() {
  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader title="Pagos" />

      <div className="max-w-xl mx-auto my-8 sm:my-12 p-5 sm:p-6 md:p-8 rounded-2xl border border-(--color-secondary-200) bg-linear-to-br from-(--color-accent-50)/80 via-(--color-surface) to-(--color-secondary-50)/80 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-(--color-accent-200) to-(--color-secondary-200) text-(--color-primary-800) flex items-center justify-center mx-auto shadow-xs border border-(--color-accent-300)/40">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-6-10.5h19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 19.5V9a2.25 2.25 0 012.25-2.25z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-(--color-primary-800)">
            Sección de pagos por definir
          </h2>
          <p className="text-base text-(--color-text-muted)">
            Aún no se define la lógica y/o uso para este apartado.
          </p>
        </div>
      </div>
    </div>
  );
}
