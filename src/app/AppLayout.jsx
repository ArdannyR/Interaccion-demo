import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { authService } from '../features/auth/authService';

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { perfil } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Close menu on ESC
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      navigate('/login', { replace: true });
    }
  };

  const menuItems = [
    { 
      to: '/pacientes', 
      label: 'Pacientes', 
      tone: 'accent',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /> 
    },
    { 
      to: '/terapeutas', 
      label: 'Terapeutas', 
      tone: 'secondary',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /> 
    },
    { 
      to: '/horarios', 
      label: 'Horarios', 
      tone: 'accent',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> 
    },
    { 
      to: '/perfil', 
      label: 'Perfil', 
      tone: 'secondary',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /> 
    },
    { 
      to: '/pagos', 
      label: 'Pagos', 
      tone: 'accent',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-6-10.5h19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 19.5V9a2.25 2.25 0 012.25-2.25z" /> 
    },
    { 
      to: '/ajustes', 
      label: 'Ajustes', 
      tone: 'secondary',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /> 
    },
  ];

  const iniciales = perfil ? `${perfil.nombres?.charAt(0) || ''}${perfil.apellidos?.charAt(0) || ''}`.toUpperCase() : '??';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-transparent relative overflow-x-hidden">
      {/* Fondo con manchas decorativas fijas detrás del contenido */}
      <div 
        className="fixed top-0 right-0 w-96 h-96 rounded-full bg-(--color-accent-300)/15 blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="fixed bottom-0 left-0 md:left-64 w-96 h-96 rounded-full bg-(--color-secondary-300)/15 blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      {/* Cabecera Móvil */}
      <div className="md:hidden flex items-center justify-between p-4 bg-(--color-surface)/85 backdrop-blur-md border-b border-(--color-border) sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-(--color-accent-400) to-(--color-secondary-400) flex items-center justify-center font-black text-base text-(--color-primary-900) shadow-xs">
            I
          </div>
          <span className="text-xl font-bold text-(--color-primary-800)">Interacción</span>
        </div>
        <button onClick={() => setMenuOpen(true)} className="p-2 text-(--color-primary-800) cursor-pointer" aria-label="Abrir menú">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden animate-fade-up"
          style={{ animationDuration: '200ms' }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Barra lateral */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-linear-to-b from-(--color-primary-700) to-(--color-primary-900) text-white shadow-2xl transition-transform duration-300 ease-in-out md:static md:w-64 md:translate-x-0 md:sticky md:top-0 md:h-screen md:flex md:flex-col relative overflow-hidden ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Dos manchas difuminadas decorativas en la barra lateral */}
        <div 
          className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-(--color-accent-400)/20 blur-2xl pointer-events-none animate-float" 
          aria-hidden="true" 
        />
        <div 
          className="absolute top-1/2 -right-8 w-40 h-40 rounded-full bg-(--color-secondary-400)/15 blur-2xl pointer-events-none animate-float" 
          style={{ animationDelay: '-8s' }} 
          aria-hidden="true" 
        />

        {/* Marca: logotipo con degradado + I en primary-900 + línea de 3rem */}
        <div className="p-6 flex items-center justify-between border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-(--color-accent-400) to-(--color-secondary-400) flex items-center justify-center font-black text-xl text-(--color-primary-900) shadow-sm shrink-0">
              I
            </div>
            <div>
              <span className="text-xl font-bold tracking-wide text-white block leading-tight">
                Interacción
              </span>
              <div 
                className="w-12 h-0.5 rounded-full bg-linear-to-r from-(--color-accent-400) to-(--color-secondary-400) mt-1" 
                aria-hidden="true" 
              />
            </div>
          </div>
          <button className="md:hidden p-1 text-white/70 hover:text-white" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Navegación */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto relative z-10">
          <p className="text-[0.7rem] font-bold uppercase tracking-widest text-(--color-secondary-300) px-3 mb-2">
            MENÚ
          </p>
          
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-base transition-all ${
                  isActive 
                    ? 'bg-white/10 text-white font-semibold shadow-inner' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Indicador lateral en degradado accent->secondary en vez de blanco */}
                  {isActive && (
                    <div 
                      className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-linear-to-b from-(--color-accent-400) to-(--color-secondary-400) shadow-xs" 
                      aria-hidden="true"
                    />
                  )}

                  {/* Recuadro redondeado de 2.25rem (w-9 h-9) */}
                  <div 
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      isActive
                        ? item.tone === 'accent'
                          ? 'bg-(--color-accent-400) text-(--color-primary-900) shadow-sm'
                          : 'bg-(--color-secondary-400) text-(--color-primary-900) shadow-sm'
                        : item.tone === 'accent'
                          ? 'bg-(--color-accent-400)/20 text-(--color-accent-200)'
                          : 'bg-(--color-secondary-400)/20 text-(--color-secondary-200)'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>

                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bloque inferior de usuario y salir */}
        <div className="p-4 bg-black/15 backdrop-blur-md border-t border-white/10 shrink-0 relative z-10">
          <div className="flex items-center gap-3 mb-3.5 px-1">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-(--color-accent-400) to-(--color-secondary-400) flex items-center justify-center font-black text-sm text-(--color-primary-900) ring-2 ring-(--color-accent-200) shadow-xs shrink-0">
              {iniciales}
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate text-white text-sm leading-snug">{perfil?.nombres}</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-(--color-secondary-400)/20 text-(--color-secondary-200) mt-0.5">
                {perfil?.rol}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-3 py-2 w-full rounded-xl text-sm font-semibold text-(--color-accent-200) bg-(--color-accent-400)/15 hover:bg-(--color-accent-400)/30 border border-(--color-accent-400)/30 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Salir
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main key={location.pathname} className="flex-1 p-4 md:p-8 animate-fade-up relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
