import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  setAuthenticated: (value: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  registerLocalUser: (userData: Omit<User, "id">) => User;
  findLocalUserByEmail: (email: string) => User | undefined;
  logout: () => void;
  getCurrentUser: () => User | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {

      return {
        user: null,
        currentUser: null,
        localUsers: [],
        isAuthenticated: false,
        role: null,

        setAuthenticated: (value: boolean) => {
          console.log("AuthStore: Setting authenticated:", value);
          set({ isAuthenticated: value });
        },

        setCurrentUser: (user: User | null) => {
          set({
            currentUser: user,
            user: user,
            isAuthenticated: !!user,
            role: user?.role || null,
          });
        },

        isAdmin: () => {
          const user = get().user;
          return user?.role === "admin" || user?.isSystemAdmin === true;
        },

        isUser: () => get().user?.role === "user",

        registerLocalUser: (userData: Omit<User, "id">) => {
          console.log("AuthStore: Registering local user:", userData.email);

          const user: User = {
            ...userData,
            id: `local-${Date.now()}`,
          };

          set((state) => {
            const newLocalUsers = [...state.localUsers, user];
            console.log(
              "AuthStore: Updated local users count:",
              newLocalUsers.length
            );
            return { localUsers: newLocalUsers };
          });

          return user;
        },

        findLocalUserByEmail: (email: string) => {
          const users = get().localUsers;
          console.log("AuthStore: Finding local user by email:", email);
          const user = users.find((u) => u.email === email);
          console.log("AuthStore: Local user found:", !!user);
          return user;
        },

        logout: () => {
          console.log("AuthStore: Logging out");
          set({
            user: null,
            currentUser: null,
            isAuthenticated: false,
            role: null,
          });
        },

        getCurrentUser: () => get().currentUser,
      };
    },
    {
      name: "auth-storage",
    }
  )
);

// const initialState = useAuthStore.getState();
// console.log("AuthStore: Initial state:", {
//   userCount: initialState.localUsers.length,
//   isAuthenticated: initialState.isAuthenticated,
//   hasUser: !!initialState.user,
// });
