import axios from "axios";
import { useAuthStore, User, UserRole } from "@/store/authStore";

console.log("Auth API: Module loaded");

export const API_URL = "http://34.238.122.213:1337/api";

export interface APIUser {
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: string;
  avatar: string;
}

export const MOCK_USERS = {
  admin: {
    email: "admin@admin.com",
    password: "admin123",
    username: "Administrador",
    role: "admin" as UserRole,
  },
  user: {
    email: "user@user.com",
    password: "user123",
    username: "Usuario",
    role: "user" as UserRole,
  },
  systemAdmin: {
    email: "ADMIN123@gmail.com",
    password: "ADMIN123",
    username: "System Administrator",
    role: "admin" as UserRole,
    isSystemAdmin: true,
  },
};

export const api = {
  async login(email: string, password: string) {
    console.log("Auth API: Login attempt for:", email);
    try {
      const mockAdmin = MOCK_USERS.admin;
      const mockUser = MOCK_USERS.user;
      const systemAdmin = MOCK_USERS.systemAdmin;

      if (email === mockAdmin.email && password === mockAdmin.password) {
        const adminUser: User = {
          id: "mock-admin",
          email: mockAdmin.email,
          username: mockAdmin.username,
          role: mockAdmin.role,
        };

        useAuthStore.getState().setCurrentUser(adminUser);
        return { success: true, user: adminUser };
      }

      if (email === mockUser.email && password === mockUser.password) {
        const normalUser: User = {
          id: "mock-user",
          email: mockUser.email,
          username: mockUser.username,
          role: mockUser.role,
        };

        useAuthStore.getState().setCurrentUser(normalUser);
        return { success: true, user: normalUser };
      }

      if (email === systemAdmin.email && password === systemAdmin.password) {
        const adminUser: User = {
          id: "system-admin",
          email: systemAdmin.email,
          username: systemAdmin.username,
          role: systemAdmin.role,
          isSystemAdmin: systemAdmin.isSystemAdmin,
        };

        useAuthStore.getState().setCurrentUser(adminUser);
        return { success: true, user: adminUser };
      }

      const store = useAuthStore.getState();
      console.log("Auth API: Checking local users first");

      const localUser = store.findLocalUserByEmail(email);
      if (localUser) {
        console.log("Auth API: Local user found:", localUser.email);

        if (localUser.password === password) {
          console.log("Auth API: Local user authenticated successfully");
          store.setCurrentUser(localUser);
          return { success: true, user: localUser };
        } else {
          console.log("Auth API: Local user password mismatch");
          return { success: false, error: "Contraseña incorrecta" };
        }
      }

      console.log("Auth API: No local user found, trying external API");
      const response = await axios.get(`${API_URL}/users`, {
        params: {
          "filters[email][$eq]": email,
        },
      });

      const users = response.data;
      console.log("Auth API: External API response:", users);

      if (users && users.length > 0) {
        const userData = users[0];
        const user: User = {
          id: userData.id,
          email: userData.email,
          username: userData.username || email.split("@")[0],
          role: (email.includes("admin") ? "admin" : "user") as UserRole,
        };
        console.log("Auth API: External user found:", user);

        store.setCurrentUser(user);
        return { success: true, user };
      } else {
        console.log(
          "Auth API: No user found in either local or external storage"
        );
        return { success: false, error: "Usuario no encontrado" };
      }
    } catch (error) {
      console.error("Auth API: Login error:", error);
      return { success: false, error: "Error al intentar iniciar sesión" };
    }
  },

  async registerLocal(userData: {
    email: string;
    password: string;
    username: string;
    role: "user";
  }) {
    console.log("Auth API: Starting registration process");
    console.log("Auth API: Registration data:", {
      email: userData.email,
      username: userData.username,
      role: userData.role,
    });

    try {
      const store = useAuthStore.getState();
      if (!store) {
        console.error("Auth API: Store not accessible");
        return {
          success: false,
          error: "Error interno: No se puede acceder al almacenamiento",
        };
      }

      const existingUser = store.findLocalUserByEmail(userData.email);
      if (existingUser) {
        console.log("Auth API: User already exists:", userData.email);
        return {
          success: false,
          error: "El correo electrónico ya está registrado",
        };
      }

      console.log("Auth API: Creating new user");
      const newUser = store.registerLocalUser(userData);

      if (!newUser) {
        console.error("Auth API: Failed to create user");
        return {
          success: false,
          error: "Error al crear el usuario",
        };
      }

      console.log("Auth API: User created successfully:", newUser.id);
      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      console.error("Auth API: Registration error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido al registrar el usuario",
      };
    }
  },

  async getUsers() {
    try {
      const response = await axios.get<APIUser[]>(`${API_URL}/users`);
      return {
        success: true,
        users: response.data.map((user) => ({
          id: user.id,
          name: `${user.nombre} ${user.apellido}`,
          email: user.email,
          role: user.rol,
          phone: user.telefono,
          avatar: user.avatar,
        })),
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      return {
        success: false,
        error: "Error al obtener la lista de usuarios",
      };
    }
  },
};
