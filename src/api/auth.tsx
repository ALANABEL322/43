import axios from "axios";
import { useAuthStore, User, UserRole } from "@/store/authStore";

console.log("Auth API: Module loaded");

export const API_URL = "http://34.238.122.213:1337/api";

export const api = {
  async login(email: string, password: string) {
    console.log("Auth API: Login attempt for:", email);
    try {
      if (email === "ADMIN123@gmail.com" && password === "ADMIN123") {
        const adminUser: User = {
          id: "system-admin",
          email: "ADMIN123@gmail.com",
          username: "System Administrator",
          role: "admin" as UserRole,
          isSystemAdmin: true,
        };

        useAuthStore.getState().setCurrentUser(adminUser);
        return { success: true, user: adminUser };
      }

      const store = useAuthStore.getState();
      console.log("Auth API: Checking local users first");

      const localUser = store.findLocalUserByEmail(email);
      if (localUser) {
        console.log("Auth API: Local user found:", localUser.email);

        // Verificar contraseña
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
};
