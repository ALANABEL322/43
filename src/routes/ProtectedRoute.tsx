import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { paths } from "./paths";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  userOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
  userOnly = false,
}: ProtectedRouteProps) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  if (!isAuthenticated) {
    return (
      <Navigate to={paths.auth.login} state={{ from: location }} replace />
    );
  }

  if (userOnly && isAdmin) {
    return <Navigate to={paths.admin.dashboard} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to={paths.user.landingPage} replace />;
  }

  if (!user?.role) {
    return <Navigate to={paths.auth.login} replace />;
  }


  if (adminOnly && !isAdmin) {
    return <Navigate to={paths.user.landingPage} replace />;
  }

  if (userOnly && isAdmin) {
    return <Navigate to={paths.admin.dashboard} replace />;
  }

  return <>{children}</>;
}
