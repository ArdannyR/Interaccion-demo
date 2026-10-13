import { forwardRef, useId } from 'react';

export const Select = forwardRef(function Select({ 
  label, 
  error, 
  children, 
  className = '', 
  ...props 
}, ref) {
  const id = useId();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-lg font-medium text-(--color-text-main)">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`w-full px-4 py-3 rounded-xl border-2 text-lg bg-(--color-surface) text-(--color-text-main) transition-all outline-none disabled:bg-(--color-surface-hover) disabled:opacity-70 disabled:cursor-not-allowed ${
          error
            ? 'border-(--color-danger-500) focus:ring-4 focus:ring-(--color-danger-100) bg-(--color-danger-50)'
            : 'border-(--color-primary-400) focus:border-(--color-primary-500) focus:ring-4 focus:ring-(--color-primary-100) hover:border-(--color-primary-500)'
        }`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <span className="text-(--color-danger-600) font-medium text-sm mt-1 animate-fade-up">{error}</span>
      )}
    </div>
  );
});
