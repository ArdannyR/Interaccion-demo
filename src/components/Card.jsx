export function Card({ children, className = '', onClick }) {
  return (
    <div 
      className={`relative bg-(--color-surface) rounded-xl shadow-sm border border-(--color-border) overflow-hidden [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-xl transition-all duration-300 group ${
        onClick ? 'cursor-pointer active:scale-[0.98]' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-(--color-accent-400) to-(--color-secondary-400) opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity" />
      {children}
    </div>
  );
}
