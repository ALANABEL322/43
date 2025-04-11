import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const useAuthRole = () => {
  const auth = useContext(AuthContext);
  
  if (!auth) {
    throw new Error('useAuthRole must be used within an AuthProvider');
  }

  const isAdmin = auth.user?.role === 'admin';
  const isUser = auth.user?.role === 'user';
  const isAuthenticated = !!auth.user;

  return {
    isAdmin,
    isUser,
    isAuthenticated,
    role: auth.user?.role
  };
};
