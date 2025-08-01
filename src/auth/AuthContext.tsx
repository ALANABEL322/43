import React, { createContext, useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore, User } from "@/store/authStore";
import { paths } from "@/routes/paths";
import { api } from "@/api/auth";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    user,
    isAuthenticated,
    logout: zustandLogout,
    isAdmin,
  } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [initialRedirectDone, setInitialRedirectDone] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !initialRedirectDone) {
      const isAuthPage = location.pathname.startsWith(paths.auth.login);
      const isAdminPath = location.pathname.startsWith(paths.admin.root);
      const isUserPath = location.pathname.startsWith(paths.user.root);

      if (isAuthPage || location.pathname === "/") {
        if (isAdmin()) {
          navigate(paths.admin.dashboard);
        } else {
          navigate(paths.user.landingPage);
        }
        setInitialRedirectDone(true);
      } else {
        if (isAdmin() && !isAdminPath) {
          navigate(paths.admin.dashboard);
        } else if (!isAdmin() && !isUserPath) {
          navigate(paths.user.landingPage);
        }
        setInitialRedirectDone(true);
      }
    }
  }, [isAuthenticated, user, navigate, location, initialRedirectDone, isAdmin]);

  useEffect(() => {
    if (!isAuthenticated) {
      setInitialRedirectDone(false);
    }
  }, [isAuthenticated]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const response = await api.login(email, password);
    setIsLoading(false);

    if (response.success) {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        if (currentUser.role === "admin") {
          navigate(paths.admin.dashboard);
        } else {
          navigate(paths.user.landingPage);
        }
      }
    }

    return response.success;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout: zustandLogout,
        isAdmin: isAdmin(),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
