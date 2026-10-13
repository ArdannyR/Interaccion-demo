export function PageHeader({ title, subtitle, actions, children, className = '' }) {
  const actionContent = actions || children;

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 ${className}`}>
      <div className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-bold text-(--color-text-main) tracking-tight">
          {title}
        </h1>
        <div 
          className="w-12 h-1 rounded-full bg-linear-to-r from-(--color-accent-400) to-(--color-secondary-400)" 
          aria-hidden="true"
        />
        {subtitle && (
          <p className="text-sm text-(--color-text-muted) pt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {actionContent && (
        <div className="flex flex-wrap items-center gap-3">
          {actionContent}
        </div>
      )}
    </div>
  );
}
