import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API_URL } from "@/api/auth";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  password?: string;
  username: string;
  role: UserRole;
  isSystemAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  currentUser: User | null;
  localUsers: User[];
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  registerLocalUser: (user: Omit<User, "id">) => User;
  logout: () => void;
  findLocalUserByEmail: (email: string) => User | undefined;
  setCurrentUser: (user: User | null) => void;
  getCurrentUser: () => User | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      currentUser: null,
      localUsers: [],
      isAuthenticated: false,
      role: null,
      isAdmin: () => {
        const user = get().user;
        return user?.role === "admin" || user?.email === "ADMIN123@gmail.com";
      },
      isUser: () => get().user?.role === "user",

      login: async (email, password) => {
        if (email === "ADMIN123@gmail.com" && password === "ADMIN123") {
          const adminUser: User = {
            id: "system-admin",
            email: "ADMIN123@gmail.com",
            username: "System Administrator",
            role: "admin",
            isSystemAdmin: true,
          };
          set({
            user: adminUser,
            currentUser: adminUser,
            isAuthenticated: true,
            role: "admin",
          });
          return true;
        }

        const localUser = get().findLocalUserByEmail(email);
        if (localUser && localUser.password === password) {
          set({
            user: localUser,
            currentUser: localUser,
            isAuthenticated: true,
            role: localUser.role,
          });
          return true;
        }
        const response = await axios.get(`${API_URL}/users`, {
          params: {
            "filters[email][$eq]": email,
          },
        });

        const users = response.data;
        if (users && users.length > 0) {
          const userData = users[0];
          const user: User = {
            id: userData.id,
            email: userData.email,
            username: userData.username || email.split("@")[0],
            role: email.includes("admin") ? "admin" : "user",
          };
          set({
            user,
            currentUser: user,
            isAuthenticated: true,
            role: user.role,
          });
          return true;
        }

        return false;
      },

      registerLocalUser: (newUser) => {
        const user = {
          ...newUser,
          id: `local-${Date.now()}`,
        };
        set((state) => ({
          localUsers: [...state.localUsers, user],
        }));
        return user;
      },

      logout: () =>
        set({
          user: null,
          currentUser: null,
          isAuthenticated: false,
          role: null,
        }),

      findLocalUserByEmail: (email) => {
        return get().localUsers.find((user) => user.email === email);
      },

      setCurrentUser: (user) => set({ currentUser: user }),
      getCurrentUser: () => get().currentUser,
    }),
    {
      name: "auth-storage",
    }
  )
);
