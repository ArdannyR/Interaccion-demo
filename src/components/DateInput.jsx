export function DateInput({ label, helperText, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-lg font-medium text-(--color-text-main)">{label}</label>}
      <input
        type="date"
        className={`w-full px-4 py-3 rounded-xl border-2 text-lg bg-(--color-surface) text-(--color-text-main) transition-all outline-none ${
          error
            ? 'border-(--color-danger-500) focus:ring-4 focus:ring-(--color-danger-100) bg-(--color-danger-50)'
            : 'border-(--color-primary-400) focus:border-(--color-primary-500) focus:ring-4 focus:ring-(--color-primary-100) hover:border-(--color-primary-500)'
        }`}
        {...props}
      />
      {error && (
        <span className="text-(--color-danger-600) font-medium text-sm mt-1 animate-fade-up">{error}</span>
      )}
      {helperText && !error && <p className="text-sm text-(--color-text-muted)">{helperText}</p>}
    </div>
  );
}

