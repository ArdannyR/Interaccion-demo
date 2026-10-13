import { forwardRef, useId } from 'react';

export const Input = forwardRef(function Input({ label, helperText, error, className = '', ...props }, ref) {
  const id = useId();
  
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-(--color-text-main)">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-base bg-(--color-surface) text-(--color-text-main) transition-all outline-none ${
          error 
            ? 'border-(--color-danger-500) focus:ring-4 focus:ring-(--color-danger-100) bg-(--color-danger-50)' 
            : 'border-(--color-primary-400) focus:border-(--color-primary-500) focus:ring-4 focus:ring-(--color-primary-100) hover:border-(--color-primary-500)'
        }`}
        {...props}
      />
      {error && (
        <span className="text-(--color-danger-600) font-medium text-sm mt-1 animate-fade-up">{error}</span>
      )}
      {helperText && !error && (
        <p className="text-sm text-(--color-text-muted)">{helperText}</p>
      )}
    </div>
  );
});
