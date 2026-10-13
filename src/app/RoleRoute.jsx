import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

export function RoleRoute({ allowedRoles }) {
  const { session, perfil, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-(--color-background)">
        <div className="text-xl text-(--color-text-muted) font-medium">Cargando...</div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!perfil) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-(--color-background)">
        <div className="text-xl text-(--color-text-muted) font-medium">Verificando acceso...</div>
      </div>
    );
  }

  if (!allowedRoles.includes(perfil.rol)) {
    // Si no tiene el rol correcto, lo devolvemos a inicio
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

