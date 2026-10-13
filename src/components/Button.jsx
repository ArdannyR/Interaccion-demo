export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading = false,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl text-lg px-6 py-3 transition-all focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-linear-to-b from-(--color-primary-500) to-(--color-primary-700) hover:from-(--color-primary-400) hover:to-(--color-primary-600) text-white shadow-lg shadow-(--color-primary-500)/30 hover:-translate-y-0.5 focus:ring-(--color-primary-300)",
    secondary: "bg-(--color-surface-hover) hover:bg-(--color-border) text-(--color-text-main) focus:ring-(--color-primary-100) hover:-translate-y-0.5",
    outline: "border-2 border-(--color-primary-600) text-(--color-primary-700) hover:bg-(--color-primary-50) focus:ring-(--color-primary-100) hover:-translate-y-0.5 bg-(--color-surface)",
    accent: "bg-(--color-secondary-400) hover:bg-(--color-secondary-500) text-(--color-primary-900) focus:ring-(--color-secondary-200) hover:-translate-y-0.5 shadow-md shadow-(--color-secondary-400)/20",
    danger: "bg-(--color-danger-600) hover:bg-(--color-danger-700) text-white focus:ring-(--color-danger-200) hover:-translate-y-0.5 shadow-md shadow-(--color-danger-600)/20"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      ) : null}
      {children}
    </button>
  );
}
