import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  password: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        try {
          if (
            username === ADMIN_CREDENTIALS.username &&
            password === ADMIN_CREDENTIALS.password
          ) {
            set({
              user: {
                id: 1,
                username,
                email: 'admin@example.com',
                role: 'admin',
                password,
              },
              isAuthenticated: true,
            });
            return true;
          }

          if (username.toLowerCase() !== 'admin') {
            set({
              user: {
                id: 2,
                username,
                email: '',
                role: 'user',
                password,
              },
              isAuthenticated: true,
            });
            return true;
          }

          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          if (username.toLowerCase() === 'admin') {
            return false;
          }

          set({
            user: {
              id: 2,
              username,
              email,
              role: 'user',
              password,
            },
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          console.error('Register error:', error);
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      isAdmin: () => {
        const state = get();
        return state.user?.role === 'admin';
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
