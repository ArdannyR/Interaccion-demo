export function PageHeader({ title, subtitle, actions, children, className = '' }) {
  const actionContent = actions || children;

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-1 ${className}`}>
      <div className="space-y-1.5 min-w-0 w-full sm:w-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-(--color-text-main) tracking-tight break-words">
          {title}
        </h1>
        <div 
          className="w-12 h-1 rounded-full bg-linear-to-r from-(--color-accent-400) to-(--color-secondary-400)" 
          aria-hidden="true"
        />
        {subtitle && (
          <p className="text-sm text-(--color-text-muted) pt-0.5 break-words">
            {subtitle}
          </p>
        )}
      </div>
      {actionContent && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0 [&>*]:w-full [&>*]:sm:w-auto">
          {actionContent}
        </div>
      )}
    </div>
  );
}
