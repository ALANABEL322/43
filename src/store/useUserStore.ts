import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import { StateCreator } from 'zustand/vanilla';

const generateId = () => nanoid(); 

type UserRole = 'admin' | 'user';
type AuthStore = AuthState & AuthActions;

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
}

interface AuthActions {
  register: (email: string, password: string, username: string, role?: UserRole) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<Omit<User, 'id' | 'role'>>) => void;
  isAdmin: () => boolean;
  getCurrentUser: () => User | null;
}

const authStoreCreator: StateCreator<AuthStore, [['zustand/persist', unknown], ['zustand/immer', never]], [], AuthStore> = 
  (set, get) => ({
    user: null,
    isAuthenticated: false,
    users: [
      {
        id: 'admin-1',
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        id: 'user-1',
        username: 'user',
        email: 'user@example.com',
        password: 'user123',
        role: 'user'
      }
    ],

    register: (email, password, username, role = 'user') => {
      if (!email || !password || !username) return false;
      const { users } = get();

      if (users.some(u => u.email === email)) {
        return false;
      }

      const newUser: User = {
        id: generateId(),
        username,
        email,
        password,
        role
      };

      set(state => {
        state.users.push(newUser);
        state.user = newUser;
        state.isAuthenticated = true;
      });

      return true;
    },

    login: (email, password) => {
      const { users } = get();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        set({
          user,
          isAuthenticated: true
        });
        return true;
      }
      return false;
    },

    logout: () => set({
      user: null,
      isAuthenticated: false,
    }),

    updateUser: (updates) => set((state) => {
      if (state.user) {
        state.user = { ...state.user, ...updates };
        const index = state.users.findIndex((u: { id: string }) => u.id === state.user?.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...updates };
        }
      }
    }),

    isAdmin: () => {
      const { user } = get();
      return user?.role === 'admin';
    },

    getCurrentUser: () => {
      return get().user;
    }
  });

export const useAuthStore = create<AuthStore>()(
  persist(
    immer(authStoreCreator),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        users: state.users
      }),
    }
  )
);

export const useCurrentUser = () => useAuthStore(state => state.user);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);
export const useIsAdmin = () => useAuthStore(state => state.isAdmin());
export const useAuthActions = () => useAuthStore(state => ({
  register: state.register,
  login: state.login,
  logout: state.logout,
  updateUser: state.updateUser,
}));