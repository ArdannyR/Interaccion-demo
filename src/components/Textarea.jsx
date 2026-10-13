import { forwardRef, useId } from 'react';

export const Textarea = forwardRef(function Textarea({ 
  label, 
  error, 
  rows = 3,
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
      <textarea
        id={id}
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl border-2 text-lg bg-(--color-surface) text-(--color-text-main) transition-all outline-none resize-y ${
          error
            ? 'border-(--color-danger-500) focus:ring-4 focus:ring-(--color-danger-100) bg-(--color-danger-50)'
            : 'border-(--color-primary-400) focus:border-(--color-primary-500) focus:ring-4 focus:ring-(--color-primary-100) hover:border-(--color-primary-500)'
        }`}
        {...props}
      />
      {error && (
        <span className="text-(--color-danger-600) font-medium text-sm mt-1 animate-fade-up">{error}</span>
      )}
    </div>
  );
});
