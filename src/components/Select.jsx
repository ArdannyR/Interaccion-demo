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
    <div className={`flex flex-col gap-1.5 min-w-0 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-(--color-text-main) break-words">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`w-full min-w-0 min-h-11 px-3.5 py-2.5 rounded-xl border-2 text-base bg-(--color-surface) text-(--color-text-main) transition-all outline-none disabled:bg-(--color-surface-hover) disabled:opacity-70 disabled:cursor-not-allowed ${
          error
            ? 'border-(--color-danger-500) focus:ring-4 focus:ring-(--color-danger-100) bg-(--color-danger-50)'
            : 'border-(--color-primary-400) focus:border-(--color-primary-500) focus:ring-4 focus:ring-(--color-primary-100) hover:border-(--color-primary-500)'
        }`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <span className="text-(--color-danger-600) font-medium text-sm mt-1 animate-fade-up break-words">{error}</span>
      )}
    </div>
  );
});
