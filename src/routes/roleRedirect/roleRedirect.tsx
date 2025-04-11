import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { paths } from '../paths';

export default function RoleRedirect() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  if (!isAuthenticated) {
    return <Navigate to={paths.auth.login} replace />;
  }

  return isAdmin ? (
    <Navigate to={paths.admin.dashboard} replace />
  ) : (
    <Navigate to={paths.user.landingPage} replace />
  );
}
