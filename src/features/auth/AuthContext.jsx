import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from './authService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateAuth = (newSession, newProfile) => {
    setSession(newSession);
    setPerfil(newProfile);
  };

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const currentSession = await authService.getSession();
        if (mounted) {
          setSession(currentSession);
          if (currentSession?.user?.id) {
            const profile = await authService.getProfile(currentSession.user.id);
            if (mounted) setPerfil(profile);
          }
        }
      } catch (err) {
        console.error('Error al cargar sesión inicial:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initSession();

    const { data: { subscription } } = authService.onAuthStateChange(async (newSession) => {
      if (!mounted) return;
      setSession(newSession);
      if (newSession?.user?.id) {
        try {
          const profile = await authService.getProfile(newSession.user.id);
          if (mounted) setPerfil(profile);
        } catch (err) {
          console.error('Error al cargar perfil:', err);
        }
      } else {
        setPerfil(null);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, perfil, loading, updateAuth, setPerfil }}>
      {!loading ? children : (
        <div className="min-h-dvh flex items-center justify-center bg-(--color-background)">
          <div className="text-xl text-(--color-text-muted) font-medium">Cargando tu cuenta...</div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

