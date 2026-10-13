import { useState, useRef, useEffect, useId } from 'react';

export function ProfessionalPicker({ profesionales = [], selectedId, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listboxId = useId();

  const selectedIndex = profesionales.findIndex(p => p.id === selectedId);
  const currentProf = profesionales[selectedIndex] || profesionales[0];

  const getInitials = (prof) => {
    if (!prof) return '??';
    const n = prof.nombres ? prof.nombres.charAt(0) : '';
    const a = prof.apellidos ? prof.apellidos.charAt(0) : '';
    return (n + a).toUpperCase() || 'P';
  };

  const getDisplayName = (prof) => {
    if (!prof) return '';
    if (prof.esPropio) {
      return `Mi horario (${prof.nombres} ${prof.apellidos})`;
    }
    return `${prof.nombres} ${prof.apellidos}`;
  };

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % profesionales.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + profesionales.length) % profesionales.length);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(profesionales.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < profesionales.length) {
          onSelect(profesionales[focusedIndex].id);
          setIsOpen(false);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelectOption = (id) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full md:w-auto" onKeyDown={handleKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => {
          setIsOpen(!isOpen);
          setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
        }}
        className="w-full md:w-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border-2 border-(--color-primary-400) bg-(--color-surface) hover:bg-(--color-surface-hover) transition-all focus:outline-none focus:ring-4 focus:ring-(--color-primary-100)"
      >
        <div className="flex items-center gap-3 text-left min-w-0">
          <div className="w-10 h-10 rounded-full bg-(--color-primary-100) text-(--color-primary-800) font-bold flex items-center justify-center shrink-0 border border-(--color-primary-200)">
            {getInitials(currentProf)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">
              Ver horario de:
            </span>
            <span className="text-base font-bold text-(--color-text-main) truncate">
              {currentProf?.esPropio 
                ? `Mi horario (${currentProf.nombres} ${currentProf.apellidos})`
                : `${currentProf?.nombres || ''} ${currentProf?.apellidos || ''}`}
            </span>
          </div>
        </div>

        <svg 
          className={`w-5 h-5 text-(--color-primary-600) shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={focusedIndex >= 0 ? `prof-opt-${profesionales[focusedIndex]?.id}` : undefined}
          className="absolute left-0 right-0 md:right-auto md:w-80 top-full mt-2 z-30 bg-(--color-surface) rounded-xl shadow-xl border border-(--color-border) py-2 max-h-80 overflow-y-auto animate-scale-in"
        >
          {profesionales.map((prof, index) => {
            const isSelected = prof.id === selectedId;
            const isFocused = index === focusedIndex;

            return (
              <li
                key={prof.id}
                id={`prof-opt-${prof.id}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectOption(prof.id)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`min-h-[3rem] px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-(--color-primary-50)' : isFocused ? 'bg-(--color-surface-hover)' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-(--color-primary-100) text-(--color-primary-800) font-bold text-xs flex items-center justify-center shrink-0">
                    {getInitials(prof)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-base truncate ${isSelected ? 'font-bold text-(--color-primary-800)' : 'font-medium text-(--color-text-main)'}`}>
                      {getDisplayName(prof)}
                    </span>
                    {!prof.esPropio && prof.especialidad && (
                      <span className="text-xs text-(--color-text-muted) truncate">
                        {prof.especialidad}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <svg 
                    className="w-5 h-5 text-(--color-primary-600) shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
