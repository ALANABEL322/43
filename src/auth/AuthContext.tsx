import React, { createContext, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema, registerSchema } from './schemas';
import { useAuthStore, User } from '@/store/useUserStore';
import { paths } from '@/routes/paths';


export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean; 
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, 
    isAuthenticated,
    login: zustandLogin, 
    logout: zustandLogout, 
    register: zustandRegister,
    isAdmin
  } = useAuthStore();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'admin' ? paths.admin.dashboard : paths.user.landingPage);
    }
  }, [isAuthenticated, user, navigate]);

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await loginSchema.validate({ email, password });
      const success = zustandLogin(email, password);
      
      if (success) {
        const targetPath = isAdmin() ? paths.admin.dashboard : paths.user.landingPage;
        navigate(targetPath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      await registerSchema.validate({ username, email, password });
      const success = zustandRegister(email, password, username);
      
      if (success) {
        navigate(paths.user.landingPage);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    zustandLogout();
    navigate(paths.auth.login);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: isAdmin(), isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}