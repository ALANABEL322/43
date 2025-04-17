import React, { createContext, useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore, User } from "@/store/authStore";
import { paths } from "@/routes/paths";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
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
    login: zustandLogin,
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
        const targetPath =
          user.role === "admin" ? paths.admin.dashboard : paths.user.landingPage;

        navigate(targetPath);
        setInitialRedirectDone(true);
      }
    }
  }, [isAuthenticated, user, navigate, location, initialRedirectDone]);

  useEffect(() => {
    if (!isAuthenticated) {
      setInitialRedirectDone(false);
    }
  }, [isAuthenticated]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const success = await zustandLogin(email, password);
    setIsLoading(false);
    return success;
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    return false;
  };

  const logout = () => {
    zustandLogout();
    navigate(paths.auth.login);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAdmin: isAdmin(), isLoading }}
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
